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
        this.uniforms.color = [(this.color >> 16 & 0xFF) / 255, (this.color >> 8 & 0xFF) / 255, (this.color & 0xFF) / 255, this.alpha];
        this.blurFilter.blur = this.blur * this.resolution / this.quality;
    }

    /**
    {
        this.blurFilter.resolution = this.resolution;
        this.blurFilter.apply(filterManager, input, output, clear);
        for (let i = 0; i < Math.max(1, Math.min(5, this.quality)); i++)
        {
            filterManager.applyFilter(this, input, output, clear);
        }