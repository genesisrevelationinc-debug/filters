import { Filter } from '@pixi/core';
import { isMobile } from '@pixi/utils';
import { settings } from '@pixi/settings';
import vertex from './blur.vert';
import fragment from './blur.frag';
import type { FilterSystem } from '@pixi/core';
import type { CLEAR_MODES } from '@pixi/constants';

const APPLE_MOBILE_REGEX = /iPhone|iPad|iPod|Macintosh/;

/**
 * The BlurFilterPass applies a horizontal or vertical Gaussian blur to an object.
 * @memberof PIXI.filters
        this.passes = passes;
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
     * Applies the filter to the specified object.
     * @param filterManager - The renderer to retrieve the filter from
     */
    apply(filterManager: FilterSystem, input, output, clearMode): void
    {
        // Reduce passes on Apple mobile devices for performance
        let passes = this.passes;
        if (this._isAppleMobile()) {
            passes = Math.min(passes, 2);
        }

        const { width, height } = input;

        const direction = this.horizontal ? [this.strength, 0] : [0, this.strength];
        let renderTarget = filterManager.getFilterTexture();
        let flip = input;
        let flop = renderTarget;
        const last = passes - 1;

        for (let i = 0; i < last; i++)
        {
            filterManager.applyFilter(this, flip, flop, 1);

            const temp = flop;
            flop = flip; 
            flip = temp;
        }

        this.uniforms.uInputSize[0] = width;
        this.uniforms.uInputSize[1] = height;

        if (passes === 1)
        {
            filterManager.applyFilter(this, flip, output, clearMode);
        }