uniform vec2 uOffset;
uniform vec2 uPixelSize;

const float MAX_QUALITY = 8.0; // Reduced from 16 for better performance

in vec2 vTextureCoord;

    float blur = uBlur;
    float quality = clamp(uQuality, 1.0, MAX_QUALITY);
    
    float step = 1.0 / max(quality, 2.0); // Ensure minimum step size for performance
    
    for (float x = -1.0; x <= 1.0; x += step)
    {