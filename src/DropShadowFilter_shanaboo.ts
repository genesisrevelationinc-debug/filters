--- a/src/dropshadow/DropShadowFilter.ts
+++ b/src/dropshadow/DropShadowFilter.ts
@@ -122,7 +122,7 @@ export class DropShadowFilter extends Filter
 
     private _getOptimizedQuality(quality: number): number
     {
-        return isMobile.apple() ? Math.min(quality, 2) : quality;
+        return isMobile.apple() ? Math.min(quality, 2) : quality;
     }
 
     /**
