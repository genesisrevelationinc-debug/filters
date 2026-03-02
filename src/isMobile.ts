--- a/src/utils/isMobile.ts
+++ b/src/utils/isMobile.ts
@@ -0,0 +1,27 @@
+/**
+ * Simple mobile device detection utility
+ */
+export const isMobile = {
+    apple: () => {
+        if (typeof navigator === 'undefined') return false;
+        
+        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
+        
+        // iPhone, iPad, iPod
+        return /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
+    },
+    
+    any: () => {
+        if (typeof navigator === 'undefined') return false;
+        
+        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
+        
+        return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
+            userAgent.toLowerCase()
+        );
+    },
+    
+    // For testing purposes
+    _setUserAgent: (ua: string) => { (navigator as any).userAgent = ua; }
+};
