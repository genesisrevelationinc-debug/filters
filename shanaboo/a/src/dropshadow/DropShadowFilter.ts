import { Filter, GlProgram, GpuProgram, Rectangle, settings, Texture, utils } from 'pixi.js';
import { vertex, wgslVertex } from '../defaults';
import { maxRecommendedTextures } from '@pixi/core';
import fragment from './dropshadow.frag';
import source from './dropshadow.wgsl';

    private _blurFilterPass2: KawaseBlurFilter;
    private _resolution: number;
    private _distance: number;
    private _quality: number;

    /**
     * @param options - Options for the new filter.
        this._distance = options.distance ?? 5;
        this._angle = options.angle ?? Math.PI / 4;
        this._resolution = options.resolution ?? settings.RESOLUTION;
        this._quality = options.quality ?? 3;

        const blurOptions = { ...options };

        blurOptions.pixelSize = options.pixelSize;
        blurOptions.resolution = this._resolution;

        this._blurFilterPass1 = new KawaseBlurFilter({ ...blurOptions, quality: Math.min(this._quality, 4) });
        this._blurFilterPass1.repeatEdgePixels = true;
        this._blurFilterPass2 = new KawaseBlurFilter(blurOptions);
        this._blurFilterPass2.repeatEdgePixels = true;
        this._updatePadding();

        this.uniforms.uShadowColor = utils.hex2rgb(options.color ?? 0x000000, this.uniforms.uShadowColor);
        this.uniforms.uQuality = this._quality;
        this.uniforms.uAlpha = options.alpha ?? 0.5;
        this.uniforms.uBlur = options.blur ?? 2;
        this.uniforms.uResolution = this._resolution;
        this.uniforms.uOffset = new Float32Array(2);

        this._updateShader();

        // Optimize for Apple devices
        if (navigator.platform.includes('Mac') || navigator.platform.includes('iPhone'))
        {
            this._optimizeForAppleDevices();
        }
    }

    /**
        this._updatePadding();
    }

    /**
     * Optimizes the filter for Apple devices which have different GPU characteristics
     * @private
     */
    private _optimizeForAppleDevices(): void
    {
        // Reduce quality on Apple devices to improve performance
        const maxQuality = 2;
        
        if (this._quality > maxQuality)
        {
            this._quality = maxQuality;
            this._blurFilterPass1.quality = maxQuality;
            this.uniforms.uQuality = maxQuality;
        }
    }

    /**
     * Applies the filter.
     * @param filterManager - The filter manager.
        const target = filterManager.getFilterTexture(input);
        const target2 = filterManager.getFilterTexture(input);

        // Use half resolution for Apple devices to improve performance
        const isAppleDevice = navigator.platform.includes('Mac') || navigator.platform.includes('iPhone');
        const resolutionScale = isAppleDevice ? 0.5 : 1;
        
        filterManager.pushFilter(target, target2, this, 0, input, resolutionScale);

        // Draw the drop-shadow to the target texture...
        this.uniforms.uOffset[0] = Math.cos(this._angle) * this._distance;
        this.uniforms.uOffset[1] = Math.sin(this._angle) * this._distance;
        this._applyFilter(this._blurFilterPass1, target, target2, true);
        this._applyFilter(this._blurFilterPass2, target2, target, false);

        filterManager.applyFilter(this, input, output, clearMode, resolutionScale);

        filterManager.returnFilterTexture(target2);
        filterManager.returnFilterTexture(target);