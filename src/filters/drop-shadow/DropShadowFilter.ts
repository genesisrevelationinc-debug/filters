export default class DropShadowFilter extends Filter
{
    private _distance: number;
    private _quality: number;
    constructor(distance = 5, angle = Math.PI / 4, color = 0x000000, blur = 5, quality = 1)
    {
        this.angle = angle;
        this.color = color;
        this.blur = blur;
        this.quality = quality;
    }
    /**
        this.uniforms.blur = blur;
    }
    get quality(): number
    {
        return this._quality;
    }

    set quality(value: number)
    {
        this._quality = value;
        this.updatePadding();
    }

    /**
     * Recalculates the padding required by the filter.
     * @private
        const blur = Math.max(this.blur, 1);
        const offset = this.distance * Math.max(Math.abs(Math.sin(this.angle)), Math.abs(Math.cos(this.angle)));
        this.padding = Math.max(blur, offset) * this.quality + 1;
    }
    /**
        const offset = this.distance * Math.max(Math.abs(Math.sin(this.angle)), Math.abs(Math.cos(this.angle)));
        this.uniforms.offset = [offset * Math.cos(this.angle) / resolution, offset * Math.sin(this.angle) / resolution];
        this.uniforms.strength = this.blur / (2 * padding * this.quality);
    }
}