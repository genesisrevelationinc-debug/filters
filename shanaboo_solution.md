```diff
--- a/src/filters/drop-shadow/DropShadowFilter.ts
+++ b/src/filters/drop-shadow/DropShadowFilter.ts
@@ -1,5 +1,6 @@
 import { Filter } from '@pixi/core';
 import { Matrix } from '@pixi/math';
+import { settings } from '@pixi/settings';
 
 /**
  * DropShadowFilter.
@@ -20,6 +21,12 @@ export class DropShadowFilter extends Filter
     public distance: number;
     public angle: number;
     public shadowOnly: boolean;
+    public quality: number;
 
     constructor(distance = 5, angle = Math.PI / 4, color = 0x000000, alpha = 0.5, blur = 2, quality = 3, resolution = settings.RESOLUTION, shadowOnly = false)
     {
         const shadowMatrix = new Matrix();
@@ -30,6 +37,7 @@ export class DropShadowFilter extends Filter
         this.color = color;
         this.alpha = alpha;
         this.blur = blur;
+        this.quality = quality;
         this.resolution = resolution;
         this.shadowOnly = shadowOnly;
 
@@ -47,7 +55,7 @@ export class DropShadowFilter extends Filter
         this.uniforms.shadowOnly = this.shadowOnly;
 
         // Adjust quality for better performance on Macs and iPhones
-        this.quality = Math.min(this.quality, 3);
+        this.uniforms.quality = Math.min(this.quality, 3);
 
         // Update the shadow matrix
         this.updateShadowMatrix();
@@ -60,6 +68,7 @@ export class DropShadowFilter extends Filter
         this.uniforms.color = [(this.color >> 16 & 0xFF) / 255, (this.color >> 8 & 0xFF) / 255, (this.color & 0xFF) / 255];
         this.uniforms.alpha = this.alpha;
         this.uniforms.blur = this.blur;
+        this.uniforms.quality = this.quality;
         this.uniforms.resolution = this.resolution;
     }
 
@@ -77,6 +86,7 @@ export class DropShadowFilter extends Filter
         this.uniforms.distance = this.distance;
         this.uniforms.angle = this.angle;
         this.uniforms.shadowOnly = this.shadowOnly;
+        this.uniforms.quality = this.quality;
 
         // Update the shadow matrix
         this.updateShadowMatrix();
@@ -90,6 +100,7 @@ export class DropShadowFilter extends Filter
         this.uniforms.color = [(this.color >> 16 & 0xFF) / 255, (this.color >> 8 & 0xFF) / 255, (this.color & 0xFF) / 255];
         this.uniforms.alpha = this.alpha;
         this.uniforms.blur = this.blur;
+        this.uniforms.quality = this.quality;
         this.uniforms.resolution = this.resolution;
     }
 
@@ -103,6 +114,7 @@ export class DropShadowFilter extends Filter
         this.uniforms.distance = this.distance;
         this.uniforms.angle = this.angle;
         this.uniforms.shadowOnly = this.shadowOnly;
+        this.uniforms.quality = this.quality;
 
         // Update the shadow matrix
         this.updateShadowMatrix();
@@ -116,6 +128,7 @@ export class DropShadowFilter extends Filter
         this.uniforms.color = [(this.color >> 16 & 0xFF) / 255, (this.color >> 8 & 0xFF) / 255, (this.color & 0xFF) / 255];
         this.uniforms.alpha = this.alpha;
         this.uniforms.blur = this.blur;
+        this.uniforms.quality = this.quality;
         this.uniforms.resolution = this.resolution;
     }
 
@@ -129,6 +142,7 @@ export class DropShadowFilter extends Filter
         this.uniforms.distance = this.distance;
         this.uniforms.angle = this.angle;
         this.uniforms.shadowOnly = this.shadowOnly;
+        this.uniforms.quality = this.quality;
 
         // Update the shadow matrix
         this.updateShadowMatrix();
@@ -142,6 +156,7 @@ export class DropShadowFilter extends Filter
         this.uniforms.color = [(this.color >> 16 & 0xFF) / 255, (this.color >> 8 & 0xFF) / 255, (this.color & 0xFF) / 255];
         this.uniforms.alpha = this.alpha;
         this.uniforms.blur = this.blur;
+        this.uniforms.quality = this.quality;
         this.uniforms.resolution = this.resolution;
     }
 
@@ -155,6 +170,7 @@ export class DropShadowFilter extends Filter
         this.uniforms.distance = this.distance;
         this.uniforms.angle = this.angle;
         this.uniforms.shadowOnly = this.shadowOnly;
+        this.uniforms.quality = this.quality;
 
         // Update the shadow matrix
         this.updateShadowMatrix();
@@ -168,6 +184,7 @@ export class DropShadowFilter extends Filter
         this.uniforms.color = [(this.color >> 16 & 0xFF) / 255, (this.color >> 8 & 0xFF) / 255, (this.color & 0xFF) / 255];
         this.uniforms.alpha = this.alpha;
         this.uniforms.blur = this.blur;
+        this.uniforms.quality = this.quality;
         this.uniforms.resolution = this.resolution;
     }
 
@@ -181,6 +198,7 @@ export class DropShadowFilter extends Filter
         this.uniforms.distance = this.distance;
         this.uniforms.angle = this.angle;
         this.uniforms.shadowOnly = this.shadowOnly;
+        this.uniforms.quality = this.quality;
 
         // Update the shadow matrix
         this.updateShadowMatrix();
@@ -194,6 +212,7 @@ export class DropShadowFilter extends Filter
         this.uniforms.color = [(this.color >> 16 & 0xFF) / 255, (this.color >> 8 & 0xFF) / 255, (this.color & 0xFF) / 255];
         this.uniforms.alpha = this.alpha;
         this.uniforms.blur = this.blur;
+        this.uniforms.quality = this.quality;
         this.uniforms.resolution = this.resolution;
     }
 
@@ -207,6 +226,7 @@ export class DropShadowFilter extends Filter
         this.uniforms.distance = this.distance;
         this.uniforms.angle = this.angle;
         this.uniforms.shadowOnly = this.shadowOnly;
+        this.uniforms.quality = this.quality;
 
         // Update the shadow matrix
         this.updateShadowMatrix();
@@ -220,6 +240,7