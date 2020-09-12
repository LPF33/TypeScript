"use strict";
var Graphics = /** @class */ (function () {
    function Graphics() {
    }
    Graphics.prototype.colorRect = function (ctx, tolLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(tolLeftX, topLeftY, boxWidth, boxHeight);
    };
    Graphics.prototype.colorCirlce = function (ctx, centerX, centerY, radius, fillColor) {
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fill();
    };
    Graphics.prototype.colorText = function (ctx, showWords, textX, TextY, fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fillText(showWords, textX, TextY);
    };
    return Graphics;
}());
