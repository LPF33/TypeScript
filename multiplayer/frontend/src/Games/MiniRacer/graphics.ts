export function drawImageCenteredWithRotation(
    ctx: CanvasRenderingContext2D,
    useImage: HTMLImageElement,
    atX: number,
    atY: number,
    withAng: number
) {
    ctx.save();
    ctx.translate(atX, atY);
    ctx.rotate(withAng);
    ctx.drawImage(useImage, -useImage.width / 2, -useImage.height / 2);
    ctx.restore();
}

export function colorRect(
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

export function colorCirlce(
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

export function colorText(
    ctx: CanvasRenderingContext2D,
    showWords: string,
    textX: number,
    TextY: number,
    fillColor: string
) {
    ctx.fillStyle = fillColor;
    ctx.fillText(showWords, textX, TextY);
}
