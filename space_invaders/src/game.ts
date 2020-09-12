window.requestAnimationFrame =
    window.requestAnimationFrame || window.webkitRequestAnimationFrame;

interface CanvasVar {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
}

enum GameState {
    start = "game-start",
    play = "while-playing",
    end = "game-over",
}

enum Direction {
    left = "ArrowLeft",
    right = "ArrowRight",
}

interface KeyBool {
    ArrowLeft: boolean;
    ArrowRight: boolean;
}

class Ship extends Graphics {
    private ctx: CanvasRenderingContext2D;
    private canvasWidth: number;
    private canvasHeight: number;
    private shipX: number;
    private shipY: number;
    private shipWidth: number = 40;
    private shipHeight: number = 15;
    private shipSpeed: number = 2.5;
    private rocketX: number = 0;
    private rocketY: number = 0;
    private rocketDia: number = 10;
    private lives: number = 3;

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
        super();
        this.ctx = ctx;
        this.canvasWidth = x;
        this.canvasHeight = y;
        this.shipX = x / 2 - this.shipWidth / 2;
        this.shipY = y - this.shipHeight - 10;
    }

    draw(moved: KeyBool) {
        this.move(moved);
        super.colorRect(
            this.ctx,
            this.shipX,
            this.shipY,
            this.shipWidth,
            this.shipHeight,
            "yellow"
        );
        this.rocket();
        super.colorCirlce(
            this.ctx,
            this.rocketX,
            this.rocketY,
            this.rocketDia,
            "blue"
        );
    }

    move(moved: KeyBool) {
        if (moved.ArrowLeft) {
            this.shipX = this.shipX <= 0 ? 0 : this.shipX - this.shipSpeed;
        } else if (moved.ArrowRight) {
            this.shipX =
                this.shipX + this.shipWidth >= this.canvasWidth
                    ? this.canvasWidth - this.shipWidth
                    : this.shipX + this.shipSpeed;
        }
    }

    rocket() {
        this.rocketX = this.shipX;
        this.rocketY += 15;
    }

    mousePosition(x: number) {
        if (x < this.shipX) {
            return Direction.left;
        } else if (x >= this.shipX && x <= this.shipX + this.shipWidth) {
            return "";
        } else {
            return Direction.right;
        }
    }
}

class Game extends Graphics {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private width: number;
    private height: number;
    private state: GameState;
    private animationID: number = 0;
    private ship: Ship;
    private keyPressed: KeyBool = { ArrowLeft: false, ArrowRight: false };

    constructor(canvasElement: CanvasVar, state: GameState) {
        super();
        this.canvas = canvasElement.canvas;
        this.ctx = canvasElement.ctx;
        this.width = canvasElement.width;
        this.height = canvasElement.height;
        this.state = state;
        this.ship = new Ship(this.ctx, this.width, this.height);
    }

    startScreen(): void {
        this.clearCanvas();
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Space Invaders", this.width / 2, this.height / 2);
        this.ctx.font = "20px Arial";
        this.ctx.fillText(
            "Click or press a Key to start",
            this.width / 2,
            this.height / 2 + 40
        );
    }

    countdown(seconds: number = 3): void {
        this.clearCanvas();
        this.ctx.font = "40px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "center";
        this.ctx.fillText(String(seconds), this.width / 2, this.height / 2);

        if (seconds > 0) {
            setTimeout(() => this.countdown(--seconds), 1000);
        } else {
            this.playGame();
        }
    }

    playGame(): void {
        this.clearCanvas();
        this.ship.draw(this.keyPressed);
        this.animationID = window.requestAnimationFrame(() => this.playGame());
    }

    keyDown(e: KeyboardEvent): void {
        if (this.state === GameState.start) {
            this.state = GameState.play;
            //this.countdown();
            this.playGame();
        } else if (this.state === GameState.play) {
            e.preventDefault();
            if (e.key === Direction.left) {
                this.keyPressed.ArrowLeft = true;
            } else if (e.key === Direction.right) {
                this.keyPressed.ArrowRight = true;
            } else if (e.keyCode === 32 || e.key === " ") {
                this.ship.rocket();
            }
        }
    }

    keyUp(e: KeyboardEvent): void {
        if (this.state === GameState.play) {
            if (e.key === Direction.left) {
                this.keyPressed.ArrowLeft = false;
            } else if (e.key === Direction.right) {
                this.keyPressed.ArrowRight = false;
            }
        }
    }

    touch(e: TouchEvent) {
        this.pointer(e.touches[0].pageX);
    }

    mouse(e: MouseEvent) {
        this.pointer(e.clientX);
    }

    pointer(posX: number) {
        const rect = this.canvas.getBoundingClientRect();
        const root = document.documentElement;
        const mouseX = posX - rect.left - root.scrollLeft;
        const direct = this.ship.mousePosition(mouseX);
        if (direct === Direction.left) {
            this.keyPressed.ArrowRight = false;
            this.keyPressed.ArrowLeft = true;
        } else if (direct === Direction.right) {
            this.keyPressed.ArrowRight = true;
            this.keyPressed.ArrowLeft = false;
        } else {
            this.keyPressed.ArrowRight = false;
            this.keyPressed.ArrowLeft = false;
        }
    }

    clearCanvas() {
        super.colorRect(
            this.ctx,
            0,
            0,
            this.canvas.width,
            this.canvas.height,
            "black"
        );
    }
}

const canvas = new Canvas();
const game = new Game(canvas.getCanvas(), GameState.start);
game.startScreen();

window.addEventListener("keydown", game.keyDown.bind(game));
window.addEventListener("keyup", game.keyUp.bind(game));
window.addEventListener("mousemove", game.mouse.bind(game));
window.addEventListener("touchmove", game.touch.bind(game));
