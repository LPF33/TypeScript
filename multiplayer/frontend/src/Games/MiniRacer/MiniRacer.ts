import * as Levels from "./levels";
import * as Graphics from "./graphics";
import { keyboardControl } from "./ControllerClass";
import { Car } from "./CarClass";
import { Track } from "./TrackClass";
import $ from "jquery";

interface SecondCarData {
    x: number;
    y: number;
    ang: number;
}

enum Events {
    RaceFinish = "race-finished",
    DrawCar = "draw-car",
    Load = "finished-loading",
    UserLeave = "user-leave",
}

let carsFinished: number = 0;
let playersFinishedLoading: number = 0;
let level: number = 0;
let playerCar: Car;
let secondePlayerCar: Car;
let track: Track;
let intervalID: Set<number> = new Set();
let storeTimes: { player: number; time: number[] }[] = [];
let trackGrid: number[];

const carPic: HTMLImageElement = document.createElement("img");
const secondCarPic: HTMLImageElement = document.createElement("img");
const levelList: number[][] = [
    Levels.levelOne,
    Levels.levelTwo,
    Levels.levelThree,
];

export function clearCanvasInterval(): void {
    intervalID.forEach((id) => clearInterval(id));
    $(document).off("keydown");
    $(document).off("keyup");
}

export default function MiniRacerGame(
    canvas: HTMLCanvasElement | null,
    socket: any,
    playerNumber: number
): void {
    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    Graphics.colorRect(ctx, 0, 0, canvas.width, canvas.height, "black");

    Graphics.colorText(ctx, "LOADING", canvas.width / 2, canvas.height / 2, 40);

    if (playerNumber === 1) {
        playerCar = new Car(carPic, ctx, socket, playerNumber);
        secondePlayerCar = new Car(secondCarPic, ctx, socket);
    } else {
        playerCar = new Car(secondCarPic, ctx, socket, playerNumber);
        secondePlayerCar = new Car(carPic, ctx, socket);
    }

    new keyboardControl(playerCar);

    const moveAll = (): void => {
        playerCar.move(track);
        secondePlayerCar.move(track);
    };

    const drawAll = (): void => {
        track.drawtracks();
        playerCar.drawCar(true);
        secondePlayerCar.drawCar(false);
        Graphics.colorRect(ctx, 5, 5, 250, 20, "black");
        Graphics.colorText(
            ctx,
            playerCar.getTime(),
            10,
            20,
            15,
            "white",
            "start"
        );
    };

    const update = (): void => {
        moveAll();
        drawAll();
    };

    const countdown = (seconds: number = 3): void => {
        Graphics.colorRect(ctx, 0, 0, canvas.width, canvas.height, "black");
        Graphics.colorText(
            ctx,
            String(seconds),
            canvas.width / 2,
            canvas.height / 2,
            40,
            "white"
        );
        if (seconds > 0) {
            setTimeout(() => countdown(--seconds), 1000);
        } else {
            playerCar.startTimer();
            intervalID.add(setInterval(update, 1000 / 30));
        }
    };

    const loadLevel = (whichLevel: number[], start: boolean): void => {
        trackGrid = [...whichLevel];
        if (start) {
            track = new Track(carPic, secondCarPic, socket, ctx, trackGrid);
            track.loadImages();
        } else {
            track.setTrackGrid(trackGrid);
        }

        if (playerNumber === 1) {
            playerCar.reset(trackGrid);
            secondePlayerCar.reset(trackGrid);
        } else {
            secondePlayerCar.reset(trackGrid);
            playerCar.reset(trackGrid);
        }
    };

    const showPoints = () => {
        Graphics.colorRect(ctx, 0, 0, canvas.width, canvas.height, "black");
        Graphics.colorText(
            ctx,
            `Level ${level + 1} finished`,
            canvas.width / 2,
            40,
            30
        );
        for (let player of storeTimes) {
            const num = player.player === 1 ? 80 : 240;
            Graphics.colorText(
                ctx,
                `Times of Player ${player.player}`,
                canvas.width / 2,
                num,
                20,
                "red"
            );
            Graphics.colorText(
                ctx,
                `Racetime: ${Graphics.convertTime(
                    player.time[player.time.length - 1]
                )}`,
                canvas.width / 2,
                num + 30,
                25,
                "yellow"
            );
            Graphics.colorText(
                ctx,
                `Round 1: ${Graphics.convertTime(player.time[1])}`,
                canvas.width / 2,
                num + 60,
                20,
                "white"
            );
            Graphics.colorText(
                ctx,
                `Round 2: ${Graphics.convertTime(player.time[2])}`,
                canvas.width / 2,
                num + 85,
                20,
                "white"
            );
            Graphics.colorText(
                ctx,
                `Round 3: ${Graphics.convertTime(player.time[3])}`,
                canvas.width / 2,
                num + 110,
                20,
                "white"
            );
        }

        Graphics.colorText(
            ctx,
            `Prepare for next Level`,
            canvas.width / 2,
            canvas.height - 30,
            40
        );
    };

    socket.on(Events.DrawCar, (data: SecondCarData): void => {
        secondePlayerCar.secondPlayer(data);
    });

    socket.on(Events.UserLeave, (): void => {
        clearCanvasInterval();
    });

    socket.on(Events.Load, (): void => {
        playersFinishedLoading++;
        if (playersFinishedLoading === 2) {
            playersFinishedLoading = 0;
            countdown();
        }
    });

    socket.on(
        Events.RaceFinish,
        ({ player, time }: { player: number; time: number[] }): void => {
            storeTimes.push({ player, time });
            carsFinished++;
            if (carsFinished === 2) {
                intervalID.forEach((id) => clearInterval(id));
                carsFinished = 0;
                showPoints();
                level = level === 2 ? 0 : ++level;
                loadLevel(levelList[level], false);
                storeTimes = [];
                setTimeout(countdown, 10000);
            }
        }
    );

    if (socket._callbacks["$" + Events.RaceFinish].length > 1) {
        socket._callbacks["$" + Events.DrawCar].splice(0, 1);
        socket._callbacks["$" + Events.RaceFinish].splice(0, 1);
        socket._callbacks["$" + Events.UserLeave].splice(1, 1);
        socket._callbacks["$" + Events.Load].splice(0, 1);
    }

    loadLevel(levelList[0], true);
}
