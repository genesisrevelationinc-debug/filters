import { isMobile } from '@pixi/utils';
import { Filter } from '@pixi/core';
import { BlurFilter } from '../blur/BlurFilter';
import { ColorMatrixFilter } from '../color/ColorMatrixFilter';
import { settings } from '@pixi/settings';
import { DEG_TO_RAD } from '@pixi/math';
import fragment from './drop-shadow.frag';
import vertex from './drop-shadow.vert';

import type { FilterSystem, RenderTexture } from '@pixi/core';
import type { Point } from '@pixi/math';
{
    rotation?: number;
    distance?: number;
    /**
     * The quality of the shadow. Lower values improve performance.
     * @default 0.5
     */
    quality?: number;
    blur?: number;
    color?: number;
    alpha?: number;
{
    public static readonly defaults: DropShadowFilterOptions = {
        rotation: 45,
        quality: 0.5,
        distance: 5,
        blur: 2,
        color: 0x000000,
        kernels: null,
    };

    private _quality: number;
    private _blurFilter: BlurFilter;
    private _colorMatrixFilter: ColorMatrixFilter;
    private _distance: number;
    private _tintFilter: Filter;

    constructor(options?: DropShadowFilterOptions);
    /** @deprecated since 7.0.0 */
    constructor(rotation?: number, distance?: number, blur?: number, color?: number, alpha?: number);
    constructor(...args: any[])
    {
        options = { ...DropShadowFilter.defaults, ...options };

        super(vertex, fragment);
        this._quality = options.quality ?? this._getDefaultQuality();

        this._blurFilter = new BlurFilter(options.blur ?? DropShadowFilter.defaults.blur, options.quality ?? 4, options.resolution);
        this._colorMatrixFilter = new ColorMatrixFilter();
        this.alpha = options.alpha ?? DropShadowFilter.defaults.alpha;
    }

    private _getDefaultQuality(): number
    {
        // Reduce quality on mobile devices, especially Apple devices
        const isAppleDevice = /(Mac|iPhone|iPad|iPod)/.test(navigator.platform);
        
        if (isAppleDevice || isMobile.apple.device || isMobile.tablet || isMobile.phone) {
            return 0.3; // Lower quality for better performance
        }
        
        return 0.5; // Default quality
    }

    /**
     * Applies the filter.
     * @param filterManager - The renderer to retrieve the filter from.
     */
    apply(filterManager: FilterSystem, input: RenderTexture, output: RenderTexture, clear: boolean): void
    {
        // Skip rendering if quality is too low to be visible
        if (this._quality < 0.1) {
            return;
        }

        const target = filterManager.getFilterTexture();

        // Apply shadow offset
        this._tintFilter.apply(filterManager, input, target, true);

        // Apply blur to the shadow
        this._blurFilter.quality = Math.max(1, Math.floor(this._quality * 4));
        this._blurFilter.apply(filterManager, target, target, false);

        // Apply color to the shadow
        this._colorMatrixFilter.apply(filterManager, target, target, false);
        filterManager.returnFilterTexture(target);
    }

    /**
     * The quality of the shadow. Lower values improve performance.
     * @default 0.5
     */
    get quality(): number
    {
        return this._quality;
    }
    set quality(value: number)
    {
        const quality = Math.max(0.1, Math.min(1, value));
        if (this._quality !== quality)
        {
            this._quality = quality;
        }
    }

    /**
     * Sets the strength of the blur. Default: 2
     */