precision mediump float;

varying vec2 vTextureCoord;

    vec4 color = texture2D(uSampler, vTextureCoord);
    if (color.a == 0.0) discard;

    float quality = floor(uQuality);
    float dist = uDistance;
    float angle = uAngle;
    vec2 offset = vec2(cos(angle), sin(angle)) * dist;