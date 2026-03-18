precision mediump float;

uniform float quality;
uniform vec4 color;
uniform float alpha;
uniform float distance;
{
    vec4 original = texture2D(uSampler, vTextureCoord);
    vec4 shadow = vec4(0.0);
    float numSamples = quality;
    float blur = blurSize / numSamples * 0.5;

    for(float x = -numSamples; x <= numSamples; x += 1.0)