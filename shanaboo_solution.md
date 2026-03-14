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
     {
         this.uniforms.distance = this.distance * this.resolution;
         this.uniforms.angle = this.angle;
-        this.uniforms.strength = this.alpha / (this.blur * 2);
+        this.uniforms.strength = this.alpha / (this.blur * this.quality);
         this.uniforms.shadowOnly = this.shadowOnly;
     }
 
@@ -60,7 +68,7 @@ export class DropShadowFilter extends Filter
     {
         this.uniforms.distance = this.distance * this.resolution;
         this.uniforms.angle = this.angle;
-        this.uniforms.strength = this.alpha / (this.blur * 2);
+        this.uniforms.strength = this.alpha / (this.blur * this.quality);
         this.uniforms.shadowOnly = this.shadowOnly;
     }
 
@@ -73,7 +81,7 @@ export class DropShadowFilter extends Filter
     {
         this.uniforms.distance = this.distance * this.resolution;
         this.uniforms.angle = this.angle;
-        this.uniforms.strength = this.alpha / (this.blur * 2);
+        this.uniforms.strength = this.alpha / (this.blur * this.quality);
         this.uniforms.shadowOnly = this.shadowOnly;
     }
 
@@ -86,7 +94,7 @@ export class DropShadowFilter extends Filter
     {
         this.uniforms.distance = this.distance * this.resolution;
         this.uniforms.angle = this.angle;
-        this.uniforms.strength = this.alpha / (this.blur * 2);
+        this.uniforms.strength = this.alpha / (this.blur * this.quality);
         this.uniforms.shadowOnly = this.shadowOnly;
     }
 
@@ -99,7 +107,7 @@ export class DropShadowFilter extends Filter
     {
         this.uniforms.distance = this.distance * this.resolution;
         this.uniforms.angle = this.angle;
-        this.uniforms.strength = this.alpha / (this.blur * 2);
+        this.uniforms.strength = this.alpha / (this.blur * this.quality);
         this.uniforms.shadowOnly = this.shadowOnly;
     }
 
@@ -112,7 +120,7 @@ export class DropShadowFilter extends Filter
     {
         this.uniforms.distance = this.distance * this.resolution;
         this.uniforms.angle = this.angle;
-        this.uniforms.strength = this.alpha / (this.blur * 2);
+        this.uniforms.strength = this.alpha / (this.blur * this.quality);
         this.uniforms.shadowOnly = this.shadowOnly;
     }
 
@@ -125,7 +133,7 @@ export class DropShadowFilter extends Filter
     {
         this.uniforms.distance = this.distance * this.resolution;
         this.uniforms.angle = this.angle;
-        this.uniforms.strength = this.alpha / (this.blur * 2);
+        this.uniforms.strength = this.alpha / (this.blur * this.quality);
         this.uniforms.shadowOnly = this.shadowOnly;
     }
 
@@ -138,7 +146,7 @@ export class DropShadowFilter extends Filter
     {
         this.uniforms.distance = this.distance * this.resolution;
         this.uniforms.angle = this.angle;
-        this.uniforms.strength = this.alpha / (this.blur * 2);
+        this.uniforms.strength = this.alpha / (this.blur * this.quality);
         this.uniforms.shadowOnly = this.shadowOnly;
     }
 
@@ -151,7 +159,7 @@ export class DropShadowFilter extends Filter
     {
         this.uniforms.distance = this.distance * this.resolution;
         this.uniforms.angle = this.angle;
-        this.uniforms.strength = this.alpha / (this.blur * 2);
+        this.uniforms.strength = this.alpha / (this.blur * this.quality);
         this.uniforms.shadowOnly = this.shadowOnly;
     }
 
@@ -164,7 +172,7 @@ export class DropShadowFilter extends Filter
     {
         this.uniforms.distance = this.distance * this.resolution;
         this.uniforms.angle = this.angle;
-        this.uniforms.strength = this.alpha / (this.blur * 2);
+        this.uniforms.strength = this.alpha / (this.blur * this.quality);
         this.uniforms.shadowOnly = this.shadowOnly;
     }
 
@@ -177,7 +185,7 @@ export class DropShadowFilter extends Filter
     {
         this.uniforms.distance = this.distance * this.resolution;
         this.uniforms.angle = this.angle;
-        this.uniforms.strength = this.alpha / (this.blur * 2);
+        this.uniforms.strength = this.alpha / (this.blur * this.quality);
         this.uniforms.shadowOnly = this.shadowOnly;
     }
 
@@ -190,7 +198,7 @@ export class DropShadowFilter extends Filter
     {
         this.uniforms.distance = this.distance * this.resolution;
         this.uniforms.angle = this.angle;
-        this.uniforms.strength = this.alpha / (this.blur * 2);
+        this.uniforms.strength = this.alpha / (this.blur * this.quality);
         this.uniforms.shadowOnly = this.shadowOnly;
     }
 
@@ -203,7 +211,7 @@ export class DropShadowFilter extends Filter
     {
         this.uniforms.distance = this.distance * this.resolution;
         this.uniforms.angle = this.angle;
-        this.uniforms.strength = this.alpha / (this.blur * 2);
+        this.uniforms.strength = this.alpha / (this.blur * this.quality);
         this.uniforms.shadowOnly = this.shadowOnly;
     }
 
@@ -216,7 +224,7 @@ export class DropShadowFilter extends Filter