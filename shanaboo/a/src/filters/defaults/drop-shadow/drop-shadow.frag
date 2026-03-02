varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float uQuality;

void main(void)
{
    vec4 color = texture2D(uSampler, vTextureCoord);
    
    // Skip expensive alpha premultiplication on low quality settings
    float threshold = step(0.2, uQuality);
    gl_FragColor = mix(color, vec4(color.rgb * color.a, color.a), threshold);
}