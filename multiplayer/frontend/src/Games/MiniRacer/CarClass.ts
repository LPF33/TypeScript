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
    speed: number = 0;
    ang: number = 0;
    name: string = "Car";
    prevPos: number = Infinity;
    round: number = 0;
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

    reset(trackGrid: number[], startPos: number[]): void {
        this.speed = 0;
        this.round = 0;
        this.ang = -0.5 * Math.PI;
        for (let j = 0; j < trackRows; j++) {
            for (let i = 0; i < trackColumns; i++) {
                const arrayIndex: number = this.rowColToArrayIndex(i, j);

                if (trackGrid[arrayIndex] === Levels.track_Car) {
                    trackGrid[arrayIndex] = 0;
                    this.ang = -Math.PI / 2;
                    this.x = i * trackW + trackW / 2;
                    this.y = j * trackH + trackH / 2;
                    startPos.push(arrayIndex);
                    return;
                }
            }
        }
    }

    rowColToArrayIndex(col: number, row: number): number {
        return col + trackColumns * row;
    }

    roundUpdate(): void {
        if (this.playerNumber) {
            this.round++;
            const logTime = Date.now();
            if (this.round > 1) {
                this.round === 2
                    ? this.time.push(logTime - this.time[0])
                    : this.time.push(
                          logTime - this.time[0] - this.time[this.round - 2]
                      );
            }
            if (this.round === 3) {
                this.time.push(logTime - this.time[0]);
                this.socket.emit("track-finished", {
                    player: this.playerNumber,
                    time: this.time,
                });
            }
        }
    }

    startTimer(): void {
        this.time = [];
        this.timer = Date.now();
        this.time.push(this.timer);
    }

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

        track.cartrackHandling(this);
    }

    secondPlayer(data: SecondCarData): void {
        this.x = data.x;
        this.y = data.y;
        this.ang = data.ang;
    }

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
    }
}
