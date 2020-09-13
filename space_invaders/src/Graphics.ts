class Graphics {
    colorRect(
        ctx: CanvasRenderingContext2D,
        tolLeftX: number,
        topLeftY: number,
        boxWidth: number,
        boxHeight: number,
        fillColor: string
    ): void {
        ctx.fillStyle = fillColor;
        ctx.fillRect(tolLeftX, topLeftY, boxWidth, boxHeight);
    }

    colorCirlce(
        ctx: CanvasRenderingContext2D,
        centerX: number,
        centerY: number,
        radius: number,
        fillColor: string
    ): void {
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    drawText(
        ctx: CanvasRenderingContext2D,
        showWords: string,
        textX: number,
        textY: number,
        fontSize: number,
        align: CanvasTextAlign = "center",
        color: string = "white"
    ): void {
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = color;
        ctx.textBaseline = "middle";
        ctx.textAlign = align;
        ctx.fillText(showWords, textX, textY);
    }
}
