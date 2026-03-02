const MAX_QUALITY: f32 = 8.0; // Reduced from 16 for better performance

struct Uniforms {
    uShadowColor: vec3<f32>,
    var blur = uniforms.uBlur;
    var quality = clamp(uniforms.uQuality, 1.0, MAX_QUALITY);
    
    var step = 1.0 / max(quality, 2.0); // Ensure minimum step size for performance
    
    for (var x = -1.0; x <= 1.0; x += step) {
        for (var y = -1.0; y <= 1.0; y += step) {