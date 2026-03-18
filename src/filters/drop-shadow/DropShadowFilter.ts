import { Filter, Sprite } from '@pixi/core';
import { Point } from '@pixi/math';
import { settings } from '@pixi/settings';

/**
 * DropShadowFilter.
    public distance: number;
    public angle: number;
    public shadowOnly: boolean;
    public quality: number;

    constructor(distance = 5, angle = Math.PI / 4, color = 0x000000, alpha = 0.5, blur = 2, quality = 1, resolution = settings.RESOLUTION, shadowOnly = false)
    {
        super();
        this.angle = angle;
        this.color = color;
        this.alpha = alpha;
        this.quality = quality;
        this.blur = blur;
        this.resolution = resolution;
        this.shadowOnly = shadowOnly;
        this.uniforms.distance = this.distance * this.resolution;
        this.uniforms.angle = this.angle;
        this.uniforms.color = this.color;
        this.uniforms.quality = this.quality;
        this.uniforms.alpha = this.alpha;
        this.uniforms.shadowOnly = this.shadowOnly;
    }