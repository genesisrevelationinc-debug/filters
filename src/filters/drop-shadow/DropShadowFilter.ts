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

        this.padding = blur * 2;
    }
        this.uniforms.color = [(color >> 16 & 0xFF) / 255, (color >> 8 & 0xFF) / 255, (color & 0xFF) / 255, alpha];

        for (let i = 0; i < this.quality; i++)
        { // Adjust quality for better performance on lower-end devices
            this.uniforms.blur = blur * (i + 1) / this.quality;
            this.uniforms.shadowMatrix = shadowMatrix;
            this.apply(filterManager, input, output, clear);