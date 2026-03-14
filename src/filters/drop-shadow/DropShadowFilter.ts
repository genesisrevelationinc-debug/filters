import { Filter } from '@pixi/core';
import { Matrix } from '@pixi/math';
import { settings } from '@pixi/settings';

/**
 * DropShadowFilter.
    public distance: number;
    public angle: number;
    public shadowOnly: boolean;
    public quality: number;

    constructor(distance = 5, angle = Math.PI / 4, color = 0x000000, alpha = 0.5, blur = 2, quality = 3, resolution = settings.RESOLUTION, shadowOnly = false)
    {
        const shadowMatrix = new Matrix();
        this.distance = distance;
        this.angle = angle;
        this.shadowOnly = shadowOnly;
        this.quality = quality;

        this.updatePadding();
    }
        this.updatePadding();
    }

    apply(filterManager, input, output, clear): void
    {
        const resolution = filterManager.renderer.resolution;

        const cos = Math.cos(this.angle) * this.distance * resolution;
        const sin = Math.sin(this.angle) * this.distance * resolution;

        for (let i = 0; i < this.quality; i += 1)
        {
            this.uniforms.blur = (i + 1) / (this.quality + 1) * this.blur * resolution;
            this.uniforms.offset.x = cos / (i + 1);
            filterManager.applyFilter(this, input, output, clear);
            clear = true;
        }

        if (this.shadowOnly) {
            filterManager.applyFilter(this, output, input, clear);
        }
    }

    /**
        this.updatePadding();
    }

    set quality(value: number) {
        this._quality = value;
    }

    /**
     * The quality of the shadow. A higher value will give a smoother shadow (but at the cost of performance).
     *
     */
    get quality(): number
    {
        return this._quality;
    }

    private set _quality(value: number) {
        this._quality = value;
        this.updatePadding();
    }