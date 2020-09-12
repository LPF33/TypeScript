class Canvas {
    private canvas: HTMLCanvasElement = document.getElementById(
        "game"
    ) as HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D = this.canvas.getContext(
        "2d"
    ) as CanvasRenderingContext2D;
    private width: number = 0;
    private height: number = 0;

    constructor() {
        this.setCanvasSize();
        window.addEventListener("resize", this.setCanvasSize.bind(this));
    }

    setCanvasSize(): void {
        this.canvas.width = window.innerWidth >= 600 ? 600 : window.innerWidth;
        this.canvas.height =
            window.innerHeight >= 400 ? 400 : window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    getCanvas(): CanvasVar {
        return {
            canvas: this.canvas,
            ctx: this.ctx,
            width: this.width,
            height: this.height,
        };
    }
}
