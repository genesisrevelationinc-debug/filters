import { Filter } from '../../Filter';
import { settings } from '@pixi/settings';
import { BLEND_MODES } from '@pixi/constants';
import { isWebGLSupported } from '@pixi/utils';

import blurVert from './blur.vert';
import blurFrag from './blur.frag';
    private _quality: number;
    private _resolution: number;
    private _kernelSize: number;
    private _isAppleDevice: boolean;

    /**
     * @param {number} strength - The strength of the blur filter.
        this._quality = quality;
        this._resolution = resolution;
        this._kernelSize = kernelSize;
        this._isAppleDevice = /(Mac|iPhone|iPad)/i.test(navigator.userAgent);

        this.updatePadding();
    }
        const strength = this.strength;

        // Enforce maximum kernel size for performance
        let kernelSize = Math.min(this._kernelSize, MAX_KERNEL_SIZE);
        
        // Reduce kernel size on Apple devices for better performance
        if (this._isAppleDevice) {
            kernelSize = Math.min(kernelSize, Math.max(5, Math.floor(kernelSize * 0.7)));
        }

        let offset;

        }
        else
        {
            let quality = Math.max(1, Math.floor(this._quality * MAX_KERNEL_SIZE / kernelSize));
            
            // Reduce quality on Apple devices to improve performance
            if (this._isAppleDevice) {
                quality = Math.max(1, Math.floor(quality * 0.6));
            }

            offset = new Float32Array((kernelSize + 1) * quality);

            {
                const support = (i + 0.5) * strength / quality / resolution;

                offset[i * 2] = support * (this._isAppleDevice ? 0.9 : 1.0);
                offset[(i * 2) + 1] = support;
            }
        }