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
        const cachePadding = this.padding * resolution;
        const quality = this.quality;

        for (let i = 0; i < quality; i++)
        {   
            filterManager.applyFilter(this, input, tempRenderTexture, clear);
            filterManager.applyFilter(this.blur, tempRenderTexture, input);
            clear = true;