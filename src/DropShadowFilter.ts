--- a/src/dropshadow/DropShadowFilter.ts
+++ b/src/dropshadow/DropShadowFilter.ts
@@ -1,5 +1,6 @@
 import { Filter, GlProgram, GpuProgram, PointData, TexturePool, TextureSource } from 'pixi.js';
 import { vertex, wgslVertex } from '../defaults';
+import { isMobile } from '../utils/isMobile';
 import { generateBlurFragSource, generateBlurProgram } from '../utils/generateBlurProgram';
 import { getFragment, getVertex } from '../utils/getFragment';
 
@@ -119,6 +120,11 @@ export class DropShadowFilter extends Filter
         this._updatePadding();
     }
 
+    private _getOptimizedQuality(quality: number): number
+    {
+        return isMobile.apple() ? Math.min(quality, 2) : quality;
+    }
+
     /**
      * Applies the filter.
      * @param filterManager - The filter manager.
@@ -139,7 +145,8 @@ export class DropShadowFilter extends Filter
         const blurFilter = this._blurFilter;
 
         blurFilter.blur = this.blur;
-        blurFilter.quality = this.quality;
+        // Optimize quality for mobile devices
+        blurFilter.quality = this._getOptimizedQuality(this.quality);
         blurFilter.resolution = this.resolution;
 
         const targetTexture = TexturePool.getSameSizeTexture(input);
