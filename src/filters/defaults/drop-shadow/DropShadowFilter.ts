import { Filter } from '../../../Filter';
import { BlurFilterPass } from '../blur/BlurFilterPass';
import { settings } from '@pixi/settings';

import type { FilterSystem } from '../../../FilterSystem';
import type { Rectangle } from '@pixi/math';

const vertex = `in vec2 aVertexPosition;
in vec2 aTextureCoord;
in vec2 aTextureCoord2;

out vec2 vUv;
out vec2 vUvFilter;
uniform vec4 inputSize;
uniform vec4 outputFrame;
uniform vec2 scale;
uniform vec2 offset;

vec4 filterVertexPosition(vec2 pos)
{
void main(void)
{
    gl_Position = filterVertexPosition(aVertexPosition);
    vUv = aTextureCoord + offset * inputSize.zw;
    vUvFilter = filterTextureCoord(aTextureCoord) * scale;
}`;

in vec2 vUvFilter;

uniform sampler2D uSampler;
uniform sampler2D uTexture;
uniform vec4 color;
uniform float alpha;
uniform vec2 offset;
out vec4 fragColor;

void main(void) {
    vec4 shadow = texture(uSampler, vUvFilter);
    vec4 source = texture(uTexture, vUv);
    
    fragColor = source + shadow * color * alpha;
}`;

export interface DropShadowFilterOptions
{
    /**
     * The distance of the shadow from the object
     */
    distance?: number;
    /**
     * The angle of the shadow in degrees
     */
    angle?: number;
    color?: number;
    alpha?: number;
    kernels?: number[];
    pixelSize?: number | number[] | IPointData;
    resolution?: number;
    quality?: number;
}

/**
    private _angle = 45;
    private _distance = 5;
    private _tintFilter: Filter;
    private _quality: number;

    /**
     * @param options
     */
    constructor(options?: DropShadowFilterOptions)
    {
        const useOptimizedPath = settings.PREFER_ENV === 2; // Check if we're on Apple devices
        options = { ...DropShadowFilter.DEFAULT_OPTIONS, ...options };

        const { kernels, blur, quality, pixelSize, resolution } = options;
            vertex,
            fragment,
            {
                offset: { x: 0, y: 0, type: 'vec2' },
                color: { type: 'vec4', value: { x: 0, y: 0, z: 0, w: 1 } },
                alpha: { type: 'float', value: 1 },
                scale: { type: 'vec2', value: { x: 1, y: 1 } },
        );

        this._tintFilter = new Filter(vertex, fragment, {
            offset: { x: 0, y: 0, type: 'vec2' },
            color: { type: 'vec4', value: { x: 0, y: 0, z: 0, w: 1 } },
            alpha: { type: 'float', value: 1 },
            scale: { type: 'vec2', value: { x: 1, y: 1 } },

        this._blurFilter = new BlurFilterPass(
            false,
            useOptimizedPath ? Math.min(quality, 2) : quality, // Limit quality on Apple devices
            resolution,
            kernels,
            blur,
        );

        this.resolution = resolution;
        this._quality = useOptimizedPath ? Math.min(quality, 2) : quality;

        const { distance, angle, color, alpha } = options;

        this.alpha = alpha;
    }

    /** Default options for the DropShadowFilter */
    public static readonly DEFAULT_OPTIONS: DropShadowFilterOptions = {
        distance: 5,
        angle: 45,
        alpha: 1,
        blur: 2,
        quality: 3,
        resolution: 1,
    };

    /**
        this._updatePadding();
    }

    /** The alpha value of the shadow */
    get alpha(): number
    {
        return this.uniforms.alpha;
        this.uniforms.alpha = value;
    }

    /** The color of the shadow */
    get color(): number
    {
        return this._color;
        this._tintFilter.uniforms.color = this.uniforms.color;
    }

    /** The blur amount of the shadow */
    get blur(): number
    {
        return this._blurFilter.blur;
        this._blurFilter.blur = value;
    }

    /** The quality of the blur */
    get quality(): number
    {
        return this._blurFilter.quality;

    set quality(value: number)
    {
        this._blurFilter.quality = settings.PREFER_ENV === 2 ? Math.min(value, 2) : value;
    }

    /**
        this._updatePadding();
    }

    /** The distance of the shadow from the object */
    get distance(): number
    {
        return this._distance;
        this._updatePadding();
    }

    /** The angle of the shadow in degrees */
    get angle(): number
    {
        return this._angle;
        this._updatePadding();
    }

    /** The resolution of the filter */
    get resolution(): number
    {
        return this._blurFilter.resolution;
        this._blurFilter.resolution = value;
    }

    /** The pixel size of the filter */
    get pixelSize(): number | number[] | IPointData
    {
        return this._blurFilter.pixelSize;
        this._blurFilter.pixelSize = value;
    }

    /** The kernels of the blur filter */
    get kernels(): number[]
    {
        return this._blurFilter.kernels;
        this._blurFilter.kernels = value;
    }

    /** Applies the filter */
    apply(
        filterManager: FilterSystem,
        input: RenderTexture,
        clear: boolean,
        currentState: any
    ): void {
        const target = filterManager.getFilterTexture(input, this.resolution);

        // Apply blur to get the shadow
        this._blurFilter.apply(
            clear,
            currentState
        );
        
        // Apply the drop shadow effect
        this.uniforms.scale = currentState.scale;
        super.apply(
            clear,
            currentState
        );
        
        filterManager.returnFilterTexture(target);
    }
}