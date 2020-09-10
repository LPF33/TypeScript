import * as Levels from "./levels";
import * as Graphics from "./graphics";
import { keyboardControl } from "./ControllerClass";
import { Car } from "./CarClass";
import { Track } from "./TrackClass";

interface SecondCarData {
    x: number;
    y: number;
    ang: number;
}

let carsFinished: number = 0;
let level: number = 0;
let playerCar: Car;
let secondePlayerCar: Car;
let control: keyboardControl;
let track: Track;

const levelList: number[][] = [
    Levels.levelOne,
    Levels.levelTwo,
    Levels.levelThree,
];

const carPic: HTMLImageElement = document.createElement("img");
const secondCarPic: HTMLImageElement = document.createElement("img");

export let startPos: number[];

let trackGrid: number[];

export default function MiniRacerGame(
    canvas: HTMLCanvasElement | null,
    socket: any,
    playerNumber: number
): void {
    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    Graphics.colorRect(ctx, 0, 0, canvas.width, canvas.height, "white");

    Graphics.colorText(
        ctx,
        "LOADING",
        canvas.width / 2,
        canvas.height / 2,
        "black"
    );

    if (playerNumber === 1) {
        playerCar = new Car(carPic, ctx, socket, playerNumber);
        secondePlayerCar = new Car(secondCarPic, ctx, socket);
    } else {
        playerCar = new Car(secondCarPic, ctx, socket, playerNumber);
        secondePlayerCar = new Car(carPic, ctx, socket);
    }

    control = new keyboardControl(playerCar);

    const moveAll = (): void => {
        playerCar.move(track);
        secondePlayerCar.move(track);
    };

    const drawAll = (): void => {
        track.drawtracks();
        playerCar.drawCar(true);
        secondePlayerCar.drawCar(false);
    };

    const update = (): void => {
        moveAll();
        drawAll();
    };

    socket.on("draw-car", (data: SecondCarData) => {
        secondePlayerCar.secondPlayer(data);
    });

    const loadLevel = (whichLevel: number[], start: boolean): void => {
        startPos = [];
        trackGrid = [...whichLevel];
        if (start) {
            track = new Track(carPic, secondCarPic, update, ctx, trackGrid);
            track.loadImages();
        } else {
            track.setTrackGrid(trackGrid);
        }

        if (playerNumber === 1) {
            playerCar.reset(trackGrid, startPos);
            secondePlayerCar.reset(trackGrid, startPos);
        } else {
            secondePlayerCar.reset(trackGrid, startPos);
            playerCar.reset(trackGrid, startPos);
        }
    };

    socket.on("race-finished", (): void => {
        carsFinished++;
        if (carsFinished === 2) {
            carsFinished = 0;
            level = level === 2 ? 0 : ++level;
            loadLevel(levelList[level], false);
        }
    });

    loadLevel(levelList[0], true);
}
