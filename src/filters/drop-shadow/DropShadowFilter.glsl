precision mediump float;

uniform float quality;
uniform sampler2D uSampler;
uniform vec4 color;
uniform mat3 shadowMatrix;
    vec4 original = texture2D(uSampler, vTextureCoord);
    vec4 shadow = original;

    for (int i = 0; i < int(quality); i++)
    {
        vec2 offset = vec2(shadowMatrix[0][i], shadowMatrix[1][i]) * blur;
        shadow += texture2D(uSampler, vTextureCoord + offset);