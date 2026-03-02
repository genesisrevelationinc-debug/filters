import { Filter } from '@pixi/core';
import { settings } from '@pixi/settings';
import { isMobile } from '@pixi/utils';
import { vertex } from '../default-vertex';
import { KawaseBlurFilter } from '../blur/KawaseBlurFilter';
import fragment from './drop-shadow.frag';
    rotation?: number;
    distance?: number;
    blur?: number;
    quality?: number;
    color?: number;
    alpha?: number;
    shadowOnly?: boolean;
 * @param {number} [options.rotation=2] - The angle of the shadow in degrees.
 * @param {number} [options.distance=5] - Distance of shadow
 * @param {number} [options.blur=2] - Sets the strength of the Blur properties simultaneously
 * @param {number} [options.quality=3] - The quality of the shadow. Should be an integer between 1 and 5
 * @param {number} [options.color=0x000000] - The color of the shadow.
 * @param {number} [options.alpha=0.5] - The alpha of the shadow.
 * @param {boolean} [options.shadowOnly=false] - Whether render shadow only.
        rotation: 2,
        distance: 5,
        blur: 2,
        quality: 3,
        color: 0x000000,
        alpha: 0.5,
        shadowOnly: false,
    public _distance: number;
    public _angle: number;
    public _blur: number;
    public _quality: number;
    public _tintFilter: Filter;
    public _blurFilter: KawaseBlurFilter;

        this._distance = options.distance;
        this._angle = options.rotation * (Math.PI / 180);
        this._blur = options.blur;
        this._quality = Math.max(1, Math.min(5, options.quality));

        this._tintFilter = new Filter(vertex, fragment);
        this._tintFilter.uniforms.uColor = DropShadowFilter.rgb2hex(
        this._tintFilter.uniforms.uAlpha = options.alpha;

        this._blurFilter = new KawaseBlurFilter();
        this._blurFilter.quality = this._quality;
        this._blurFilter.blur = this._blur;

        this._updatePadding();
        this._updatePadding();
    }

    /**
     * The quality of the shadow.
     * @default 3
     */
    get quality(): number
    {
        return this._quality;
    }
    set quality(value: number)
    {
        const newQuality = Math.max(1, Math.min(5, value));

        if (this._quality !== newQuality)
        {
            this._quality = newQuality;

            // On mobile devices, cap quality to 2 to improve performance
            const cappedQuality = isMobile.any ? Math.min(newQuality, 2) : newQuality;

            this._blurFilter.quality = cappedQuality;
        }
    }

    /**
     * Sets the strength of the Blur properties simultaneously
     *
    get blur(): number
    {
        return this._blur;
    } 
    set blur(value: number)
    {
        this._blur = value;
        this._updatePadding();
    }


    /**
     * The alpha value of the shadow
     *
        this._updatePadding();
    }


    /**
     * The distance of the shadow
     * @default 5
        this._updatePadding();
    }


    /**
     * The angle of the shadow in degrees
     * @default 2
        this._updatePadding();
    }


    apply(filterManager, input, output, clear, currentState)
    {
        const target = filterManager.getFilterTexture();
        this.uniforms.uOffset.x = this._distance * Math.cos(this._angle);
        this.uniforms.uOffset.y = this._distance * Math.sin(this._angle);

        // Ensure quality is capped on mobile devices
        this._blurFilter.quality = isMobile.any ? Math.min(this._quality, 2) : this._quality;

        // Apply shadow
        this._tintFilter.apply(filterManager, input, target, true, currentState);