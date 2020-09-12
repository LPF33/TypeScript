class Graphics {
    colorRect(
        ctx: CanvasRenderingContext2D,
        tolLeftX: number,
        topLeftY: number,
        boxWidth: number,
        boxHeight: number,
        fillColor: string
    ) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(tolLeftX, topLeftY, boxWidth, boxHeight);
    }

    colorCirlce(
        ctx: CanvasRenderingContext2D,
        centerX: number,
        centerY: number,
        radius: number,
        fillColor: string
    ) {
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    colorText(
        ctx: CanvasRenderingContext2D,
        showWords: string,
        textX: number,
        TextY: number,
        fillColor: string
    ) {
        ctx.fillStyle = fillColor;
        ctx.fillText(showWords, textX, TextY);
    }
}
