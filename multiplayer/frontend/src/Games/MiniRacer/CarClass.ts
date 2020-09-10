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
    time: Date[] = [];

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

    rowColToArrayIndex(col: number, row: number) {
        return col + trackColumns * row;
    }

    roundUpdate() {
        if (this.playerNumber) {
            this.round++;
            if (this.round === 2) {
                this.socket.emit("track-finished", this.playerNumber);
            }
        }
    }

    move(track: Track) {
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

    secondPlayer(data: SecondCarData) {
        this.x = data.x;
        this.y = data.y;
        this.ang = data.ang;
    }

    drawCar(check: boolean) {
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
