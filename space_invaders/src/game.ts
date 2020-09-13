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
    level = "next-level",
    wait = "wait-a-second",
}

enum Direction {
    left = "ArrowLeft",
    right = "ArrowRight",
}

interface KeyBool {
    ArrowLeft: boolean;
    ArrowRight: boolean;
}

interface Rocket {
    x: number;
    y: number;
}

interface Speed {
    x: number;
    y: number;
}

class Game extends Graphics {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private width: number;
    private height: number;
    private state: GameState;
    private animationID: number = 0;
    private ship: Ship;
    private invaders: Invaders;
    private points: number = 0;
    private savedPoints: number = 0;
    private keyPressed: KeyBool = { ArrowLeft: false, ArrowRight: false };
    private level: number = 1;
    private winStatus: boolean = false;

    constructor(canvasElement: CanvasVar, state: GameState) {
        super();
        this.canvas = canvasElement.canvas;
        this.ctx = canvasElement.ctx;
        this.width = canvasElement.width;
        this.height = canvasElement.height;
        this.state = state;
        this.invaders = new Invaders(
            this.ctx,
            this.width,
            this.height,
            this.level
        );
        this.ship = new Ship(
            this.ctx,
            this.width,
            this.height,
            this.invaders.bombsDia
        );
    }

    startScreen(): void {
        this.clearCanvas();
        super.drawText(
            this.ctx,
            "Space Invaders",
            this.width / 2,
            this.height / 2,
            30
        );
        super.drawText(
            this.ctx,
            "Click or press a key to start",
            this.width / 2,
            this.height / 2 + 40,
            20
        );
    }

    countdown(seconds: number = 3): void {
        this.clearCanvas();
        super.drawText(
            this.ctx,
            String(seconds),
            this.width / 2,
            this.height / 2,
            40
        );
        if (seconds > 0) {
            setTimeout(() => this.countdown(--seconds), 1000);
        } else {
            this.playGame();
        }
    }

    playGame(): void {
        this.clearCanvas();
        this.ship.draw(
            this.keyPressed,
            this.invaders.collision.bind(this.invaders)
        );
        this.invaders.draw(this.ship.collision.bind(this.ship));
        this.showPoints();
        if (this.gameStatus()) {
            this.state = GameState.wait;
            this.endGame();
        } else {
            this.animationID = window.requestAnimationFrame(() =>
                this.playGame()
            );
        }
    }

    showPoints() {
        this.points =
            this.savedPoints +
            (this.invaders.allInvaders - this.invaders.invadersCount) *
                (10 * this.level);
        super.drawText(
            this.ctx,
            `Level: ${this.level} Points: ${this.points} Lives: ${this.ship.lives}`,
            10,
            10,
            10,
            "start"
        );
    }

    gameStatus(): boolean {
        if (this.ship.lives <= 0 || this.invaders.win >= 3) {
            this.winStatus = false;
            return true;
        } else if (this.invaders.invadersCount === 0) {
            this.winStatus = true;
            return true;
        } else {
            return false;
        }
    }

    endGame(): void {
        let text: string;
        let text2: string;
        let text3: string;
        if (this.winStatus) {
            text = "You are a hero!";
            text2 = `Points: ${this.points} Level: ${this.level}`;
            text3 = "Click or press a key to start next level!";
            setTimeout(() => (this.state = GameState.level), 1000);
        } else {
            text = "The Invaders take the World! It's over!";
            text2 = `You lost in level ${this.level}! Points: ${this.points}`;
            text3 = "Click or press a key to restart";
            setTimeout(() => (this.state = GameState.end), 1000);
        }
        this.clearCanvas();
        super.drawText(this.ctx, text, this.width / 2, this.height / 2, 30);
        super.drawText(
            this.ctx,
            text2,
            this.width / 2,
            this.height / 2 + 40,
            20,
            "center",
            "yellow"
        );
        super.drawText(
            this.ctx,
            text3,
            this.width / 2,
            this.height / 2 + 80,
            20
        );
    }

    levelUp() {
        this.savedPoints = this.points;
        this.level++;
        this.invaders.reset(this.level);
        this.ship.reset();
        this.state = GameState.play;
        this.countdown();
    }

    endReset() {
        this.savedPoints = 0;
        this.level = 1;
        this.invaders.reset(1);
        this.ship.reset();
        this.state = GameState.play;
        this.countdown();
    }

    keyDown(e: KeyboardEvent): void {
        if (this.state === GameState.start) {
            this.state = GameState.play;
            this.countdown();
        } else if (this.state === GameState.play) {
            e.preventDefault();
            if (e.key === Direction.left) {
                this.keyPressed.ArrowLeft = true;
            } else if (e.key === Direction.right) {
                this.keyPressed.ArrowRight = true;
            } else if (e.keyCode === 32 || e.key === " ") {
                this.ship.fireRocket();
            }
        } else if (this.state === GameState.end) {
            this.endReset();
        } else if (this.state === GameState.level) {
            this.levelUp();
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

    touch(e: TouchEvent): void {
        e.preventDefault();
        this.pointer(e.touches[0].pageX);
    }

    mouse(e: MouseEvent): void {
        e.preventDefault();
        this.pointer(e.clientX);
    }

    pointer(posX: number): void {
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

    pointerClick(e: MouseEvent | TouchEvent) {
        e.preventDefault();
        if (this.state === GameState.start) {
            this.state = GameState.play;
            this.countdown();
        } else if (this.state === GameState.play) {
            this.ship.fireRocket();
        } else if (this.state === GameState.end) {
            this.endReset();
        } else if (this.state === GameState.level) {
            this.levelUp();
        }
    }

    clearCanvas(): void {
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
window.addEventListener("click", game.pointerClick.bind(game));
window.addEventListener("touchstart", game.pointerClick.bind(game));
