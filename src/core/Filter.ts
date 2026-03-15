    {
        super(program, uniforms);

        // Default resolution and padding for performance
        this.resolution = 1;
        this.padding = 0;

        this.enabled = true;
        this.autoFit = true;
        this.state = State.for2d();