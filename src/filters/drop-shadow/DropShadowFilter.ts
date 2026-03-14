export default class DropShadowFilter extends Filter
{
    private static readonly fragment = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
    {
        super(DropShadowFilter.vertex, DropShadowFilter.fragment);

        // Optimize for lower performance devices
        this.resolution = 0.5;
        this.padding = 10;

        this.uniforms.distance = 5;
        this.uniforms.angle = Math.PI / 4;
        this.uniforms.color = [0.0, 0.0, 0.0, 0.5];
    {
        this.uniforms.distance = distance;
    }

    set quality(value: number)
    {
        this.padding = value * 10;
    }
}