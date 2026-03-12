import { Filter } from '../../Filter';
import { BlurFilterPass } from '../blur/BlurFilterPass';
import { BlurFilter } from '../blur/BlurFilter';
import { settings } from '@pixi/settings';
import { DEG_TO_RAD } from '@pixi/math';
import fragment from './drop-shadow.frag';

import type { FilterSystem } from '../../Filter';
import type { RenderTexture } from '@pixi/core';
import type { CLEAR_MODES } from '@pixi/constants';

/**
 * Drop shadow filter.<br>
 */
export class DropShadowFilter extends Filter
{
    public static override fragment: string = fragment;
    public static override vertex = vertex;

    /** @ignore */
        distance: 5,
        angle: 45,
        color: 0x000000,
        alpha: 0.5,
        shadowOnly: false,
        blur: 2,
        quality: 3,
        resolution: settings.FILTER_RESOLUTION,
    };

    private _tintFilter: Filter = new Filter(vertex, fragment);
    private _blurFilter: BlurFilterPass;

    private _distance: number;
    private _resolution: number;
    private _quality: number;
    private _blur: number;
    private _optimizedBlur: BlurFilter;

    /**
     * @param {object} [options] - Filter options
        options = { ...DropShadowFilter.defaults, ...options };

        super(vertex, fragment);

        this._blurFilter = new BlurFilterPass(options.blur, Math.min(options.quality, 2), options.resolution, 5);
        this._optimizedBlur = new BlurFilter(options.blur, Math.min(options.quality, 2));

        this._distance = options.distance;
        this._angle = options.angle;
        this.alpha = options.alpha;
        this.shadowOnly = options.shadowOnly;

        this.resolution = Math.min(options.resolution, 1);
    }

    /**
     */
    apply(filterManager: FilterSystem, input: RenderTexture, output: RenderTexture, clearMode: CLEAR_MODES): void
    {
        const { _tintFilter: tintFilter, _blurFilter: blurFilter, _optimizedBlur: optimizedBlur } = this;

        // Unpack the uniforms
        const angle = this._angle * DEG_TO_RAD;
        const xShift = Math.cos(angle) * distance;
        const yShift = Math.sin(angle) * distance;

        // Use optimized blur for better performance on Apple devices
        const useOptimizedBlur = this.blur > 0 && this.quality > 0;
        
        if (useOptimizedBlur) {
            optimizedBlur.blur = this.blur;
            optimizedBlur.quality = Math.min(this.quality, 2);
        } else {
            blurFilter.blur = this.blur;
            blurFilter.quality = Math.min(this.quality, 2);
        }

        // Update the tint filter
        tintFilter.uniforms.uShadowColor = this._color;
        tintFilter.uniforms.uAlpha = this.alpha;
        tintFilter.uniforms.uOffset = { x: xShift, y: yShift };
        tintFilter.resolution = Math.min(this.resolution, 1);

        // Apply the drop shadow
        const target = filterManager.getFilterTexture(input);

        if (this.shadowOnly && !useOptimizedBlur)
        {
            // Apply the blur to the input
            blurFilter.apply(filterManager, input, target, 1);
            // Apply the tint to the blurred output
            tintFilter.apply(filterManager, target, output, clearMode);
        }
        else if (!useOptimizedBlur)
        {
            const flip = filterManager.getFilterTexture(input);

            filterManager.returnFilterTexture(flip);
            filterManager.returnFilterTexture(target);
        }
        else
        {
            // Optimized path for better performance
            if (this.shadowOnly)
            {
                optimizedBlur.apply(filterManager, input, target, 1);
                tintFilter.apply(filterManager, target, output, clearMode);
            }
            else
            {
                const flip = filterManager.getFilterTexture(input);
                
                optimizedBlur.apply(filterManager, input, target, 1);
                tintFilter.apply(filterManager, target, flip, 1);
                filterManager.applyFilter(this, input, output, clearMode);
            }
        }
    }

    /**
    set distance(value: number)
    {
        this._distance = value;
        this.padding = Math.min(Math.max(Math.abs(Math.cos(this._angle * DEG_TO_RAD)) * value, Math.abs(Math.sin(this._angle * DEG_TO_RAD)) * value) + this.blur * 2, 32);
    }

    /**
    set angle(value: number)
    {
        this._angle = value;
        this.padding = Math.min(Math.max(Math.abs(Math.cos(this._angle * DEG_TO_RAD)) * this._distance, Math.abs(Math.sin(this._angle * DEG_TO_RAD)) * this._distance) + this.blur * 2, 32);
    }

    /**
    set blur(value: number)
    {
        this._blur = value;
        this.padding = Math.min(Math.max(Math.abs(Math.cos(this._angle * DEG_TO_RAD)) * this._distance, Math.abs(Math.sin(this._angle * DEG_TO_RAD)) * this._distance) + this.blur * 2, 32);
    }

    /**
    set quality(value: number)
    {
        this._quality = value;
        this._blurFilter.quality = Math.min(value, 2);
    }

    /**
    set resolution(value: number)
    {
        this._resolution = value;
        this._blurFilter.resolution = Math.min(value, 1);
    }
}