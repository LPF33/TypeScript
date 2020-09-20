import * as Graphics from "./graphics";
import * as Levels from "./levels";
import { trackColumns, trackRows, trackH, trackW, Track } from "./TrackClass";

interface SecondCarData {
    x: number;
    y: number;
    ang: number;
}

const min_Speed_Turn: number = 0.5;

export class Car {
    x: number = 75;
    y: number = 75;
    carWidth: number = 16 / 2;
    carHeight: number = 29 / 2;
    speed: number = 0;
    ang: number = 0;
    name: string = "Car";
    round: number = 0;
    prevPos: number = Infinity;
    time: number[] = [];
    timer: number = 0;

    keyHeld_Gas: boolean = false;
    keyHeld_Reverse: boolean = false;
    keyHeld_Left: boolean = false;
    keyHeld_Right: boolean = false;

    key_Up: number = 0;
    key_Down: number = 0;
    key_Left: number = 0;
    key_Right: number = 0;

    constructor(
        public image: HTMLImageElement,
        public context: CanvasRenderingContext2D,
        public socket: any,
        public playerNumber?: number
    ) {}

    setupInput(
        upKey: number,
        downKey: number,
        leftKey: number,
        rightKey: number
    ): void {
        this.key_Up = upKey;
        this.key_Down = downKey;
        this.key_Left = leftKey;
        this.key_Right = rightKey;
    }
    // reset when new level
    reset(trackGrid: number[]): void {
        this.speed = 0;
        this.round = 0;
        for (let j = 0; j < trackRows; j++) {
            for (let i = 0; i < trackColumns; i++) {
                const arrayIndex: number = this.rowColToArrayIndex(i, j);

                if (trackGrid[arrayIndex] === Levels.track_Car) {
                    trackGrid[arrayIndex] = 0;
                    this.ang = -0.5 * Math.PI;
                    this.x = i * trackW + trackW / 2;
                    this.y = j * trackH + trackH / 2;
                    return;
                }
            }
        }
    }

    rowColToArrayIndex(col: number, row: number): number {
        return col + trackColumns * row;
    }
    //track the time per round and if track after 3 rounds finished
    roundUpdate(): void {
        if (this.playerNumber) {
            this.round++;
            const logTime = Date.now();
            if (this.round > 1 && this.round <= 4) {
                let sum: number = 0;
                for (let i = 0; i < this.round - 1; i++) {
                    sum += this.time[i];
                }
                this.time.push(logTime - sum);
            }
            if (this.round === 4) {
                this.time.push(logTime - this.time[0]);
                this.socket.emit("track-finished", {
                    player: this.playerNumber,
                    time: this.time,
                });
            }
        }
    }
    // start the timer
    startTimer(): void {
        this.time = [];
        this.timer = Date.now();
        this.time.push(this.timer);
    }
    //get time of player
    getTime(): string {
        const time = Date.now() - this.timer;
        const milsec: number = time % 1000;
        let seconds: number = Math.floor(time / 1000);
        let minutes: number = 0;
        if (seconds > 60) {
            minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;
        }
        let round: number = this.round;
        if (this.round < 1) {
            round = 0;
        }
        let sec = seconds < 10 ? `0${seconds}` : seconds;

        return `Player: ${this.playerNumber} Round: ${round} Time: ${minutes}:${sec}:${milsec}`;
    }
    //calculate movement of car
    move(track: Track): void {
        this.speed *= 0.94;
        if (this.keyHeld_Gas) {
            this.speed += 0.5;
        }
        if (this.keyHeld_Reverse) {
            this.speed -= 0.2;
        }

        if (Math.abs(this.speed) > min_Speed_Turn) {
            if (this.keyHeld_Left) {
                this.ang -= 0.03 * Math.PI;
            }
            if (this.keyHeld_Right) {
                this.ang += 0.03 * Math.PI;
            }
        }

        this.x += Math.cos(this.ang) * this.speed;
        this.y += Math.sin(this.ang) * this.speed;

        this.trackHandling(track);
    }
    // check four corners of the car if collision
    trackHandling(track: Track): void {
        const checkCorners: [number, number][] = [
            [this.x - this.carWidth, this.y - this.carHeight],
            [this.x + this.carWidth, this.y - this.carHeight],
            [this.x - this.carWidth, this.y + this.carHeight],
            [this.x + this.carWidth, this.y + this.carHeight],
        ];

        const tileUnderCorners = checkCorners.map((corner) => {
            const cartrackCol = Math.floor(corner[0] / trackW);
            const cartrackRow = Math.floor(corner[1] / trackH);

            return track.returnTileTypeAtColRow(cartrackCol, cartrackRow);
        });

        console.log(tileUnderCorners);

        if (tileUnderCorners.includes(Levels.track_Wall)) {
            this.x -= Math.cos(this.ang) * this.speed;
            this.y -= Math.sin(this.ang) * this.speed;
            this.speed *= -0.5;
        } else if (
            tileUnderCorners.includes(Levels.track_Start) &&
            (this.prevPos === track.startPositions[0] ||
                this.prevPos === track.startPositions[1])
        ) {
            this.roundUpdate();
        } else if (tileUnderCorners.includes(Levels.track_Grass)) {
            this.speed *= 0.8;
        }
    }
    // get the coordinates of the second car by socket.io
    secondPlayer(data: SecondCarData): void {
        this.x = data.x;
        this.y = data.y;
        this.ang = data.ang;
    }
    // draw the car to the canvas
    drawCar(check: boolean): void {
        if (check) {
            this.socket.emit("draw-car", {
                x: this.x,
                y: this.y,
                ang: this.ang,
            });
        }
        Graphics.drawImageCenteredWithRotation(
            this.context,
            this.image,
            this.x,
            this.y,
            this.ang
        );
        //2D-transformation, rotation around center
        const rotationCal: number[][] = [
            [
                Math.cos((180 / Math.PI) * this.ang),
                -Math.sin((180 / Math.PI) * this.ang),
            ],
            [
                Math.sin((180 / Math.PI) * this.ang),
                Math.cos((180 / Math.PI) * this.ang),
            ],
        ];

        const checkCorners: [number, number][] = [
            [-this.carWidth, -this.carHeight],
            [this.carWidth, -this.carHeight],
            [-this.carWidth, this.carHeight],
            [this.carWidth, this.carHeight],
        ];

        const transformation = checkCorners.forEach((corner) => {
            const x =
                rotationCal[0][0] * corner[0] +
                rotationCal[0][1] * corner[1] +
                this.x;
            const y =
                rotationCal[1][0] * corner[0] +
                rotationCal[1][1] * corner[1] +
                this.y;
            Graphics.colorCirlce(this.context, x, y, 1, "white");
        });
    }
}
