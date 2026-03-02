import { Filter } from '../../../Filter';
import { BlurFilterPass } from '../blur/BlurFilterPass';
import { settings } from '@pixi/settings';
import { isWebGLSupported } from '@pixi/utils';

import fragment from './drop-shadow.frag';
import vertex from './drop-shadow.vert';
    rotation: number;
    shadowColor: number;
    alpha: number;
    quality: number;
}

/**
 * @param {number} [options.rotation=45] - Angle of the shadow in degrees
 * @param {number} [options.shadowColor=0x000000] - Color of the shadow
 * @param {number} [options.alpha=0.5] - Alpha of the shadow
 * @param {number} [options.quality=0.5] - Quality of the shadow blur (0.1-1.0)
 */
export class DropShadowFilter extends Filter
{
    public blurFilter: BlurFilterPass;

    private _distance: number;
    private _quality: number;

    /**
     * @param {PIXI.DropShadowFilterOptions} [options] - Options for the DropShadowFilter
            rotation = 45,
            shadowColor = 0x000000,
            alpha = 0.5,
            quality = 0.5,
        } = options;

        super(vertex, fragment);
        this._distance = distance;
        this._angle = (rotation * DEG_TO_RAD) - (Math.PI / 180);

        this.blurFilter = new BlurFilterPass(distance, 2, quality, 0);

        this.uniforms.uShadowColor = new Float32Array([
            ((shadowColor >> 16) & 0xFF) / 255,
        ]);
        this.uniforms.uAlpha = alpha;
        this.uniforms.uOffset = new Float32Array([0, 0]);
        this._quality = quality;

        this.updatePadding();
    }
    {
        this.uniforms.uOffset[0] = Math.cos(this._angle) * this._distance;
        this.uniforms.uOffset[1] = Math.sin(this._angle) * this._distance;
        this.blurFilter.quality = this._quality;
    }

    /**
    {
        this.uniforms.uAlpha = value;
    }

    /**
     * The quality of the shadow blur.
     * @default 0.5
     */
    get quality(): number
    {
        return this._quality;
    }
    set quality(value: number)
    {
        const clampedValue = Math.max(0.1, Math.min(1.0, value));
        
        if (this._quality !== clampedValue)
        {
            this._quality = clampedValue;
            this.blurFilter.quality = clampedValue;
            this.updatePadding();
        }
    }
}