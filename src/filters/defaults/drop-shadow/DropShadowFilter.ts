import { Filter } from '@pixi/core';
import { BlurFilterPass } from '../blur/BlurFilterPass';
import { isMobile } from '@pixi/utils';
import { settings } from '@pixi/settings';
import { DEG_TO_RAD } from '@pixi/math';
import vertex from './drop-shadow.vert';

import type { FilterSystem } from '@pixi/core';

const APPLE_MOBILE_REGEX = /iPhone|iPad|iPod|Macintosh/;

/**
 * Drop shadow filter.<br>
 * ![](../filters/drop-shadow.png)
        super(vertex, fragment);

        this._tintFilter = new Filter(vertex, fragment);
        this._blurFilter = new BlurFilterPass(2, 2, 0);

        this.updatePadding();

        this._updatePadding();
    }

    private _isAppleMobile(): boolean
    {
        if (typeof navigator !== 'undefined' && navigator.userAgent)
        {
            return APPLE_MOBILE_REGEX.test(navigator.userAgent);
        }
        return false;
    }

    /**
     * Applies the filter.
     * @param filterManager - The renderer to retrieve the filter from
     */
    apply(filterManager: FilterSystem, input, output, clearMode): void
    {
        // Optimize for Apple devices
        const isAppleMobile = this._isAppleMobile();
        const originalQuality = this._blurFilter.quality;
        const originalBlur = this._blurFilter.blur;
        
        if (isAppleMobile)
        {
            // Reduce quality on Apple devices for better performance
            this._blurFilter.quality = Math.min(this._blurFilter.quality, 2);
            this._blurFilter.blur = Math.min(this._blurFilter.blur, 8);
        }

        const { width, height } = input;

        const target = filterManager.getFilterTexture();
        this._tintFilter.uniforms.uColor = this.color;
        this._tintFilter.uniforms.uAlpha = this.alpha;
        this._tintFilter.apply(filterManager, target, output, clearMode);

        if (isAppleMobile)
        {
            this._blurFilter.quality = originalQuality;
            this._blurFilter.blur = originalBlur;
        }
    }

    /**
     */
    get blur(): number
    {
        return this._blurFilter.blur / 2;
    }

    /**
     */
    set blur(value: number)
    {
        this._blurFilter.blur = value * 2;
        this._updatePadding();
    }

     */
    get quality(): number
    {
        return this._blurFilter.quality;
    }

    /**
     */
    set quality(value: number)
    {
        let finalQuality = value;
        if (this._isAppleMobile()) {
            finalQuality = Math.min(value, 2);
        }
        this._blurFilter.quality = finalQuality;
    }

    /**