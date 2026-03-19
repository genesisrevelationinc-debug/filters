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
        this.color = color;
        this.alpha = alpha;
        this.blur = blur;
        this.quality = quality;
        this.resolution = resolution;
        this.shadowOnly = shadowOnly;

    {
        this.uniforms.distance = this.distance * this.resolution;
        this.uniforms.angle = this.angle;
        this.uniforms.quality = Math.min(this.quality, settings.FILTER_RESOLUTION);
        this.uniforms.color = this.color;
        this.uniforms.alpha = this.alpha;
        this.uniforms.blur = this.blur * this.resolution;