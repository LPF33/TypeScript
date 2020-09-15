import { Car } from "./CarClass";
import $ from "jquery";

export class keyboardControl {
    key_Up: number = 38;
    key_Down: number = 40;
    key_Left: number = 37;
    key_Right: number = 39;

    constructor(public playerCar: Car) {
        this.setupInput();
    }

    keySet(key: number, whichCar: Car, setTo: boolean): void {
        if (key === this.key_Left) {
            whichCar.keyHeld_Left = setTo;
        }
        if (key === this.key_Right) {
            whichCar.keyHeld_Right = setTo;
        }
        if (key === this.key_Up) {
            whichCar.keyHeld_Gas = setTo;
        }
        if (key === this.key_Down) {
            whichCar.keyHeld_Reverse = setTo;
        }
    }

    keyDown(e: any): void {
        this.keySet(e.keyCode, this.playerCar, true);
    }

    keyReleased(e: any): void {
        this.keySet(e.keyCode, this.playerCar, false);
    }

    setupInput(): void {
        $(document).on("keydown", this.keyDown.bind(this));
        $(document).on("keyup", this.keyReleased.bind(this));

        this.playerCar.setupInput(
            this.key_Up,
            this.key_Down,
            this.key_Left,
            this.key_Right
        );
    }
}
