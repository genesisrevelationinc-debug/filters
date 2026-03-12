precision mediump float;

uniform float quality;
uniform vec2 distance;
uniform float angle;
uniform vec3 color;
{
    vec2 offset = distance * vec2(cos(angle), sin(angle));
    vec4 shadowColor = vec4(color, alpha);
    float total = 0.0;

    for (float i = -quality; i <= quality; i += 1.0)
    {