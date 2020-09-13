class Ship extends Graphics {
    private ctx: CanvasRenderingContext2D;
    private canvasWidth: number;
    private canvasHeight: number;
    private shipX: number;
    private shipY: number;
    private shipWidth: number = 40;
    private shipHeight: number = 15;
    private shipSpeed: number = 2.5;
    private rocketDia: number = 3;
    private invaderBombsDia: number;
    private lastRocketFired: number | null = null;
    public rocketArr: Rocket[] = [];
    private rocketSpeed: number = 3;
    public lives: number = 3;

    constructor(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        diameter: number
    ) {
        super();
        this.ctx = ctx;
        this.canvasWidth = x;
        this.canvasHeight = y;
        this.shipX = x / 2 - this.shipWidth / 2;
        this.shipY = y - this.shipHeight - 10;
        this.invaderBombsDia = diameter;
    }

    draw(moved: KeyBool, collision: (x: number, y: number) => boolean): void {
        this.move(moved);

        const color: string = this.lives === 1 ? "violet" : "yellow";

        super.colorRect(
            this.ctx,
            this.shipX,
            this.shipY,
            this.shipWidth,
            this.shipHeight,
            color
        );

        this.moveBomb(collision);

        for (let i = 0; i < this.rocketArr.length; i++) {
            super.colorCirlce(
                this.ctx,
                this.rocketArr[i].x,
                this.rocketArr[i].y,
                this.rocketDia,
                "blue"
            );
        }
    }

    move(moved: KeyBool): void {
        if (moved.ArrowLeft) {
            this.shipX = this.shipX <= 0 ? 0 : this.shipX - this.shipSpeed;
        } else if (moved.ArrowRight) {
            this.shipX =
                this.shipX + this.shipWidth >= this.canvasWidth
                    ? this.canvasWidth - this.shipWidth
                    : this.shipX + this.shipSpeed;
        }
    }

    moveBomb(collision: (x: number, y: number) => boolean): void {
        for (let i = 0; i < this.rocketArr.length; i++) {
            const rocket = this.rocketArr[i];
            rocket.y -= this.rocketSpeed;

            if (rocket.y < 0) {
                this.rocketArr.splice(i--, 1);
            }

            if (collision(rocket.x, rocket.y)) {
                this.rocketArr.splice(i--, 1);
            }
        }
    }

    fireRocket(): void {
        if (
            this.lastRocketFired === null ||
            Date.now() - this.lastRocketFired > 100
        ) {
            this.lastRocketFired = Date.now();
            const newRocket: Rocket = {
                x: this.shipX + this.shipWidth / 2,
                y: this.shipY,
            };
            this.rocketArr.push(newRocket);
        }
    }

    collision(x: number, y: number) {
        for (let i = 0; i < this.rocketArr.length; i++) {
            const rocket = this.rocketArr[i];
            const distance_2 =
                Math.pow(x - rocket.x, 2) + Math.pow(y - rocket.y, 2);
            const distance = Math.sqrt(distance_2);
            if (distance < this.rocketDia + this.invaderBombsDia) {
                this.rocketArr.splice(i, 1);
                return true;
            }
        }
        if (
            x >= this.shipX &&
            x <= this.shipX + this.shipWidth &&
            y >= this.shipY &&
            y <= this.shipY + this.shipHeight
        ) {
            this.lives--;
            return true;
        } else {
            return false;
        }
    }

    mousePosition(x: number): string {
        if (x < this.shipX) {
            return Direction.left;
        } else if (x >= this.shipX && x <= this.shipX + this.shipWidth) {
            return "";
        } else {
            return Direction.right;
        }
    }

    reset() {
        this.shipX = this.canvasWidth / 2 - this.shipWidth / 2;
        this.shipY = this.canvasHeight - this.shipHeight - 10;
        this.lastRocketFired = null;
        this.rocketArr = [];
        this.lives = 3;
    }
}
