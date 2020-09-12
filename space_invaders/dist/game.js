"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
window.requestAnimationFrame =
    window.requestAnimationFrame || window.webkitRequestAnimationFrame;
var GameState;
(function (GameState) {
    GameState["start"] = "game-start";
    GameState["play"] = "while-playing";
    GameState["end"] = "game-over";
})(GameState || (GameState = {}));
var Direction;
(function (Direction) {
    Direction["left"] = "ArrowLeft";
    Direction["right"] = "ArrowRight";
})(Direction || (Direction = {}));
var Ship = /** @class */ (function (_super) {
    __extends(Ship, _super);
    function Ship(ctx, x, y) {
        var _this = _super.call(this) || this;
        _this.shipWidth = 40;
        _this.shipHeight = 15;
        _this.shipSpeed = 2.5;
        _this.rocketX = 0;
        _this.rocketY = 0;
        _this.rocketDia = 10;
        _this.lives = 3;
        _this.ctx = ctx;
        _this.canvasWidth = x;
        _this.canvasHeight = y;
        _this.shipX = x / 2 - _this.shipWidth / 2;
        _this.shipY = y - _this.shipHeight - 10;
        return _this;
    }
    Ship.prototype.draw = function (moved) {
        this.move(moved);
        _super.prototype.colorRect.call(this, this.ctx, this.shipX, this.shipY, this.shipWidth, this.shipHeight, "yellow");
        this.rocket();
        _super.prototype.colorCirlce.call(this, this.ctx, this.rocketX, this.rocketY, this.rocketDia, "blue");
    };
    Ship.prototype.move = function (moved) {
        if (moved.ArrowLeft) {
            this.shipX = this.shipX <= 0 ? 0 : this.shipX - this.shipSpeed;
        }
        else if (moved.ArrowRight) {
            this.shipX =
                this.shipX + this.shipWidth >= this.canvasWidth
                    ? this.canvasWidth - this.shipWidth
                    : this.shipX + this.shipSpeed;
        }
    };
    Ship.prototype.rocket = function () {
        this.rocketX = this.shipX;
        this.rocketY += 15;
    };
    Ship.prototype.mousePosition = function (x) {
        if (x < this.shipX) {
            return Direction.left;
        }
        else if (x >= this.shipX && x <= this.shipX + this.shipWidth) {
            return "";
        }
        else {
            return Direction.right;
        }
    };
    return Ship;
}(Graphics));
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(canvasElement, state) {
        var _this = _super.call(this) || this;
        _this.animationID = 0;
        _this.keyPressed = { ArrowLeft: false, ArrowRight: false };
        _this.canvas = canvasElement.canvas;
        _this.ctx = canvasElement.ctx;
        _this.width = canvasElement.width;
        _this.height = canvasElement.height;
        _this.state = state;
        _this.ship = new Ship(_this.ctx, _this.width, _this.height);
        return _this;
    }
    Game.prototype.startScreen = function () {
        this.clearCanvas();
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Space Invaders", this.width / 2, this.height / 2);
        this.ctx.font = "20px Arial";
        this.ctx.fillText("Click or press a Key to start", this.width / 2, this.height / 2 + 40);
    };
    Game.prototype.countdown = function (seconds) {
        var _this = this;
        if (seconds === void 0) { seconds = 3; }
        this.clearCanvas();
        this.ctx.font = "40px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "center";
        this.ctx.fillText(String(seconds), this.width / 2, this.height / 2);
        if (seconds > 0) {
            setTimeout(function () { return _this.countdown(--seconds); }, 1000);
        }
        else {
            this.playGame();
        }
    };
    Game.prototype.playGame = function () {
        var _this = this;
        this.clearCanvas();
        this.ship.draw(this.keyPressed);
        this.animationID = window.requestAnimationFrame(function () { return _this.playGame(); });
    };
    Game.prototype.keyDown = function (e) {
        if (this.state === GameState.start) {
            this.state = GameState.play;
            //this.countdown();
            this.playGame();
        }
        else if (this.state === GameState.play) {
            e.preventDefault();
            if (e.key === Direction.left) {
                this.keyPressed.ArrowLeft = true;
            }
            else if (e.key === Direction.right) {
                this.keyPressed.ArrowRight = true;
            }
            else if (e.keyCode === 32 || e.key === " ") {
                this.ship.rocket();
            }
        }
    };
    Game.prototype.keyUp = function (e) {
        if (this.state === GameState.play) {
            if (e.key === Direction.left) {
                this.keyPressed.ArrowLeft = false;
            }
            else if (e.key === Direction.right) {
                this.keyPressed.ArrowRight = false;
            }
        }
    };
    Game.prototype.touch = function (e) {
        this.pointer(e.touches[0].pageX);
    };
    Game.prototype.mouse = function (e) {
        this.pointer(e.clientX);
    };
    Game.prototype.pointer = function (posX) {
        var rect = this.canvas.getBoundingClientRect();
        var root = document.documentElement;
        var mouseX = posX - rect.left - root.scrollLeft;
        var direct = this.ship.mousePosition(mouseX);
        if (direct === Direction.left) {
            this.keyPressed.ArrowRight = false;
            this.keyPressed.ArrowLeft = true;
        }
        else if (direct === Direction.right) {
            this.keyPressed.ArrowRight = true;
            this.keyPressed.ArrowLeft = false;
        }
        else {
            this.keyPressed.ArrowRight = false;
            this.keyPressed.ArrowLeft = false;
        }
    };
    Game.prototype.clearCanvas = function () {
        _super.prototype.colorRect.call(this, this.ctx, 0, 0, this.canvas.width, this.canvas.height, "black");
    };
    return Game;
}(Graphics));
var canvas = new Canvas();
var game = new Game(canvas.getCanvas(), GameState.start);
game.startScreen();
window.addEventListener("keydown", game.keyDown.bind(game));
window.addEventListener("keyup", game.keyUp.bind(game));
window.addEventListener("mousemove", game.mouse.bind(game));
window.addEventListener("touchmove", game.touch.bind(game));
