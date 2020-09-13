class Invaders extends Graphics {
    private ctx: CanvasRenderingContext2D;
    private canvasWidth: number;
    private canvasHeight: number;
    private invaderCols: number = 15;
    private invaderRows: number = 4;
    private invaderWidth: number = 20;
    private invaderArr: boolean[] = [];
    public allInvaders: number = 0;
    public invadersCount: number = 0;
    private invadersDistance: Speed = { x: 0, y: 0 };
    private invadersSpeed: Speed = { x: -0.7, y: 0.5 };
    private level: number;
    public win: number = 0;
    private lastBombFired: number | null = null;
    private bombSpeed: number = 3;
    public bombsDia: number = 2;
    private bombsArr: Rocket[] = [];
    private attackers: number[] = [];

    constructor(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        level: number
    ) {
        super();
        this.ctx = ctx;
        this.canvasWidth = x;
        this.canvasHeight = y;
        this.level = level;
        this.init();
    }

    draw(collision: (x: number, y: number) => boolean): void {
        let leftSideTurn = false,
            rightSideTurn = false,
            invadersLanded = false;
        for (let row = 0; row < this.invaderRows; row++) {
            for (let col = 0; col < this.invaderCols; col++) {
                const arrayIndex = this.rowColToArrayIndex(col, row);

                if (this.invaderArr[arrayIndex]) {
                    super.colorRect(
                        this.ctx,
                        this.invaderWidth * col + this.invadersDistance.x,
                        this.invaderWidth * row + this.invadersDistance.y,
                        this.invaderWidth - 10,
                        this.invaderWidth - 10,
                        "red"
                    );
                    if (
                        this.invaderWidth * (col + 1) +
                            this.invadersDistance.x -
                            10 >=
                        this.canvasWidth
                    ) {
                        rightSideTurn = true;
                    } else if (
                        this.invaderWidth * col + this.invadersDistance.x <=
                        0
                    ) {
                        leftSideTurn = true;
                    } else if (
                        this.invaderWidth * (row + 1) +
                            this.invadersDistance.y >=
                        this.canvasHeight - 20
                    ) {
                        invadersLanded = true;
                    }
                }
            }
        }

        if (leftSideTurn) {
            this.invadersSpeed.y = 0.5;
            this.invadersSpeed.x *= -1;
        } else if (rightSideTurn) {
            this.invadersSpeed.y = 0.5;
            this.invadersSpeed.x *= -1;
        } else if (
            this.invadersDistance.y &&
            this.invadersDistance.y % 20 === 0
        ) {
            this.invadersSpeed.y = 0;
        }

        if (invadersLanded) {
            this.win = 3;
        }

        this.invadersDistance.x += this.invadersSpeed.x;
        this.invadersDistance.y += this.invadersSpeed.y;

        this.fireBomb();
        this.moveBomb(collision);

        for (let i = 0; i < this.bombsArr.length; i++) {
            super.colorCirlce(
                this.ctx,
                this.bombsArr[i].x,
                this.bombsArr[i].y,
                this.bombsDia,
                "pink"
            );
        }
    }

    fireBomb(): void {
        if (
            this.lastBombFired === null ||
            Date.now() - this.lastBombFired > 400
        ) {
            this.lastBombFired = Date.now();
            const randomInvader = this.attackers[
                Math.floor(Math.random() * this.attackers.length)
            ];
            if (this.invaderArr[randomInvader]) {
                const [col, row] = this.indexToColRow(randomInvader);
                const newBomb: Rocket = {
                    x:
                        this.invaderWidth * (col + 0.5) -
                        5 +
                        this.invadersDistance.x,
                    y:
                        this.invaderWidth * (row + 1) -
                        10 +
                        this.invadersDistance.y,
                };
                this.bombsArr.push(newBomb);
            }
        }
    }

    moveBomb(collision: (x: number, y: number) => boolean): void {
        for (let i = 0; i < this.bombsArr.length; i++) {
            const bomb = this.bombsArr[i];
            bomb.y += this.bombSpeed;

            if (bomb.y >= this.canvasHeight) {
                this.bombsArr.splice(i--, 1);
            }

            if (collision(bomb.x, bomb.y)) {
                this.bombsArr.splice(i--, 1);
            }
        }
    }

    collision(rocketX: number, rocketY: number): boolean {
        const rocketCol = Math.floor(
            (rocketX - this.invadersDistance.x) / this.invaderWidth
        );
        const rocketRow = Math.floor(
            (rocketY - this.invadersDistance.y) / this.invaderWidth
        );

        if (
            rocketCol >= 0 &&
            rocketCol < this.invaderCols &&
            rocketRow >= 0 &&
            rocketRow < this.invaderRows
        ) {
            const index = this.rowColToArrayIndex(rocketCol, rocketRow);
            if (this.invaderArr[index]) {
                const attackIndex = this.attackers.indexOf(index);
                if (attackIndex !== -1) {
                    this.newAttacker(rocketCol, rocketRow, index, attackIndex);
                }
                this.invaderArr[index] = false;
                this.invadersCount--;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    newAttacker(
        col: number,
        row: number,
        index: number,
        attackIndex: number
    ): void {
        row--;
        while (row >= 0) {
            const newIndex = this.rowColToArrayIndex(col, row);
            if (this.invaderArr[newIndex]) {
                this.attackers.splice(attackIndex, 1, newIndex);
                return;
            }
            row--;
        }

        this.attackers.splice(attackIndex, 1);
    }

    indexToColRow(index: number): number[] {
        const row = Math.floor(index / this.invaderCols);
        const col = Math.floor(index % this.invaderCols);
        return [col, row];
    }

    rowColToArrayIndex(col: number, row: number): number {
        return col + this.invaderCols * row;
    }

    init(): void {
        this.invaderRows += this.level;
        this.allInvaders = this.invaderCols * this.invaderRows;
        for (let i = 0; i < this.invaderCols * this.invaderRows; i++) {
            this.invaderArr[i] = true;
            this.invadersCount++;
            if (i > this.invaderCols * (this.invaderRows - 1) - 1) {
                this.attackers.push(i);
            }
        }
    }

    reset(level: number) {
        this.level = level;
        this.invaderRows = 4;
        this.invadersCount = 0;
        this.attackers = [];
        this.bombsArr = [];
        this.invadersDistance = { x: 0, y: 0 };
        this.invadersSpeed = { x: -(0.7 + 0.2 * level), y: 0.5 };
        this.win = 0;
        this.init();
    }
}
