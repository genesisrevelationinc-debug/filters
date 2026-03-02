uniform vec2 uOffset;
uniform float uAlpha;
uniform sampler2D uSampler;
uniform vec2 uTextureSize;

varying vec2 vTextureCoord;

{
    vec4 color = texture2D(uSampler, vTextureCoord);
    vec4 shadowColor = texture2D(uSampler, vTextureCoord - uOffset);
    
    // Optimize shadow calculation for better performance
    float shadowAlpha = shadowColor.a * uAlpha;
    
    // Early exit optimization
    if (shadowAlpha < 0.01) {
        gl_FragColor = color;
        return;
    }
    
    shadowColor = vec4(uShadowColor.rgb, shadowAlpha);
    gl_FragColor = color + shadowColor * (1.0 - color.a);
}