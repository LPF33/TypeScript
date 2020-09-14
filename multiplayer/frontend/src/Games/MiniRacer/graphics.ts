export function drawImageCenteredWithRotation(
    ctx: CanvasRenderingContext2D,
    useImage: HTMLImageElement,
    atX: number,
    atY: number,
    withAng: number
): void {
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
): void {
    ctx.fillStyle = fillColor;
    ctx.fillRect(tolLeftX, topLeftY, boxWidth, boxHeight);
}

export function colorCirlce(
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

export function colorText(
    ctx: CanvasRenderingContext2D,
    showWords: string,
    textX: number,
    textY: number,
    fontSize: number,
    color: string = "white",
    align: CanvasTextAlign = "center"
): void {
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.fillText(showWords, textX, textY);
}

export function convertTime(time: number) {
    const milsec: number = time % 1000;
    let seconds: number = Math.floor(time / 1000);
    let minutes: number = 0;
    if (seconds > 60) {
        minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
    }
    let sec = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${sec}:${milsec}`;
}
