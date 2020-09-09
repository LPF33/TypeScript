import * as Levels from "./levels";
import * as Graphics from "./graphics";
import { EventHandler, KeyboardEvent } from "react";

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

    let picsToLoad: number = 0;
    let carsFinished: number = 0;
    let level: number = 0;
    let playerCar: Car;
    let secondePlayerCar: Car;
    const levelList: number[][] = [
        Levels.levelOne,
        Levels.levelTwo,
        Levels.levelThree,
    ];
    const trackW: number = 40;
    const trackH: number = 40;
    const trackColumns: number = 20;
    const trackRows: number = 15;

    let startPos: number[] = [];

    let trackGrid: number[];
    const trackPics: HTMLImageElement[] = [];

    function drawtracks() {
        let arrayIndex = 0;
        let drawTileX = 0;
        let drawTileY = 0;
        for (let j = 0; j < trackRows; j++) {
            for (let i = 0; i < trackColumns; i++) {
                const tileKind = trackGrid[arrayIndex];
                let useImg = trackPics[tileKind];
                ctx.drawImage(useImg, drawTileX, drawTileY);
                drawTileX += trackW;
                arrayIndex++;
            }
            drawTileY += trackH;
            drawTileX = 0;
        }
    }

    interface ImageList1 {
        varName: HTMLImageElement;
        file: string;
    }

    interface ImageList2 {
        trackType: number;
        file: string;
    }

    interface SecondCarData {
        x: number;
        y: number;
        ang: number;
    }

    const carPic = document.createElement("img");
    const secondCarPic = document.createElement("img");

    function countLoadedImagesAndLaunchIfReady() {
        picsToLoad--;
        if (!picsToLoad) {
            imageLoadingDone();
        }
    }

    function loadImage(imgVar: HTMLImageElement, fileName: string) {
        imgVar.onload = countLoadedImagesAndLaunchIfReady;
        imgVar.src = "/MiniRacer/images/" + fileName;
    }

    function loadImageForTrackCode(trackCode: number, fileName: string) {
        trackPics[trackCode] = document.createElement("img");
        loadImage(trackPics[trackCode], fileName);
    }

    function loadImages(): void {
        const carImageList: ImageList1[] = [
            { varName: carPic, file: "car.png" },
            { varName: secondCarPic, file: "redcar.png" },
        ];

        const trackImageList: ImageList2[] = [
            { trackType: Levels.track_Wall, file: "wall.png" },
            { trackType: Levels.track_Road, file: "road.png" },
            { trackType: Levels.track_Start, file: "start.png" },
            { trackType: Levels.track_Grass, file: "grass.png" },
        ];

        picsToLoad = carImageList.length + trackImageList.length;

        for (let image of carImageList) {
            loadImage(image.varName, image.file);
        }

        for (let image of trackImageList) {
            loadImageForTrackCode(image.trackType, image.file);
        }
    }

    function cartrackHandling(whichCar: Car) {
        const cartrackCol = Math.floor(whichCar.x / trackW);
        const cartrackRow = Math.floor(whichCar.y / trackH);

        if (
            cartrackCol >= 0 &&
            cartrackCol < trackColumns &&
            cartrackRow >= 0 &&
            cartrackRow < trackRows
        ) {
            const tileHere = returnTileTypeAtColRow(
                whichCar,
                cartrackCol,
                cartrackRow
            );

            if (tileHere === Levels.track_Start) {
                console.log("drive over start", whichCar);
                whichCar.roundUpdate();
            } else if (tileHere === Levels.track_Grass) {
                whichCar.speed *= 0.8;
            } else if (tileHere !== Levels.track_Road) {
                whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
                whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;
                whichCar.speed *= -0.5;
            }
        }
    }

    function rowColToArrayIndex(col: number, row: number) {
        return col + trackColumns * row;
    }

    function returnTileTypeAtColRow(whichCar: Car, col: number, row: number) {
        if (col >= 0 && col < trackColumns && row >= 0 && row < trackRows) {
            const trackIndexUnderCoord = rowColToArrayIndex(col, row);
            if (
                trackGrid[trackIndexUnderCoord] === Levels.track_Start &&
                (whichCar.prevPos === startPos[0] ||
                    whichCar.prevPos === startPos[1])
            ) {
                whichCar.prevPos = trackIndexUnderCoord;
                return Levels.track_Start;
            }
            if (
                trackGrid[trackIndexUnderCoord] === Levels.track_Start &&
                whichCar.prevPos < trackIndexUnderCoord
            ) {
                whichCar.prevPos = trackIndexUnderCoord;
                return Levels.track_Wall;
            }
            if (trackGrid[trackIndexUnderCoord] === Levels.track_Start) {
                whichCar.prevPos = trackIndexUnderCoord;
                return Levels.track_Road;
            }

            whichCar.prevPos = trackIndexUnderCoord;
            return trackGrid[trackIndexUnderCoord];
        } else {
            return Levels.track_Wall;
        }
    }

    const min_Speed_Turn: number = 0.5;

    class Car {
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

        constructor(public image: HTMLImageElement) {}

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

        reset(): void {
            this.speed = 0;
            this.round = 0;
            for (let j = 0; j < trackRows; j++) {
                for (let i = 0; i < trackColumns; i++) {
                    const arrayIndex = rowColToArrayIndex(i, j);

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

        roundUpdate() {
            console.log("rounds", this.round);
            this.round++;
            if (this.round === 2) {
                finishedLevel();
            }
        }

        move() {
            this.speed *= 0.97;
            if (this.keyHeld_Gas) {
                this.speed += 0.3;
            }
            if (this.keyHeld_Reverse) {
                this.speed -= 0.3;
            }

            if (Math.abs(this.speed) > min_Speed_Turn) {
                if (this.keyHeld_Left) {
                    this.ang -= 0.06;
                }
                if (this.keyHeld_Right) {
                    this.ang += 0.06;
                }
            }

            this.x += Math.cos(this.ang) * this.speed;
            this.y += Math.sin(this.ang) * this.speed;

            cartrackHandling(this);
        }

        secondPlayer(data: SecondCarData) {
            this.x = data.x;
            this.y = data.y;
            this.ang = data.ang;
        }

        drawCar(check: boolean) {
            if (check) {
                socket.emit("draw-car", {
                    x: this.x,
                    y: this.y,
                    ang: this.ang,
                });
            }
            Graphics.drawImageCenteredWithRotation(
                ctx,
                this.image,
                this.x,
                this.y,
                this.ang
            );
        }
    }

    if (playerNumber === 1) {
        playerCar = new Car(carPic);
        secondePlayerCar = new Car(secondCarPic);
    } else {
        playerCar = new Car(secondCarPic);
        secondePlayerCar = new Car(carPic);
    }

    const key_Up: number = 38;
    const key_Down: number = 40;
    const key_Left = 37;
    const key_Right = 39;

    function keySet(key: number, whichCar: Car, setTo: boolean) {
        if (key === key_Left) {
            whichCar.keyHeld_Left = setTo;
        }
        if (key === key_Right) {
            whichCar.keyHeld_Right = setTo;
        }
        if (key === key_Up) {
            whichCar.keyHeld_Gas = setTo;
        }
        if (key === key_Down) {
            whichCar.keyHeld_Reverse = setTo;
        }
    }

    function keyDown(e: any) {
        keySet(e.keyCode, playerCar, true);
    }

    function keyReleased(e: any) {
        keySet(e.keyCode, playerCar, false);
    }

    function setupInput() {
        document.addEventListener("keydown", keyDown);
        document.addEventListener("keyup", keyReleased);

        playerCar.setupInput(key_Up, key_Down, key_Left, key_Right);
    }

    loadImages();

    const update = () => {
        moveAll();
        drawAll();
    };

    function moveAll() {
        playerCar.move();
        secondePlayerCar.move();
    }

    function drawAll() {
        drawtracks();
        playerCar.drawCar(true);
        secondePlayerCar.drawCar(false);
    }

    socket.on("draw-car", (data: SecondCarData) => {
        secondePlayerCar.secondPlayer(data);
    });

    function loadLevel(whichLevel: number[]) {
        startPos = [];
        trackGrid = [...whichLevel];
        if (playerNumber === 1) {
            playerCar.reset();
            secondePlayerCar.reset();
        } else {
            secondePlayerCar.reset();
            playerCar.reset();
        }
    }

    function finishedLevel() {
        console.log("finished", carsFinished);
        carsFinished++;
        if (carsFinished === 2) {
            carsFinished = 0;
            level = level === 2 ? 0 : ++level;
            loadLevel(levelList[level]);
        }
    }

    function imageLoadingDone() {
        const framesPerSecond = 30;
        setupInput();
        loadLevel(Levels.levelOne);
        setInterval(update, 1000 / framesPerSecond);
    }
}
