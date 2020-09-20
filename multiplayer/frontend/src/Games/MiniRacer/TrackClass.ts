import * as Levels from "./levels";
import $ from "jquery";

interface ImageList1 {
    varName: HTMLImageElement;
    file: string;
}

interface ImageList2 {
    trackType: number;
    file: string;
}

export const trackW: number = 40;
export const trackH: number = 40;
export const trackColumns: number = 20;
export const trackRows: number = 15;

export class Track {
    trackPics: HTMLImageElement[] = [];
    picsToLoad: number = -1;
    startPositions: number[] = [];

    constructor(
        public carPic: HTMLImageElement,
        public secondCarPic: HTMLImageElement,
        public socket: any,
        public context: CanvasRenderingContext2D,
        public trackGrid: number[]
    ) {}

    countLoadedImagesAndLaunchIfReady(): void {
        this.picsToLoad--;
        if (!this.picsToLoad) {
            this.socket.emit("finished-loading");
        }
    }

    loadImage(imgVar: HTMLImageElement, fileName: string): void {
        $(imgVar).on("load", () => {
            this.countLoadedImagesAndLaunchIfReady();
        });
        imgVar.src = "/MiniRacer/images/" + fileName;
    }

    loadImageForTrackCode(trackCode: number, fileName: string): void {
        this.trackPics[trackCode] = document.createElement("img");
        this.loadImage(this.trackPics[trackCode], fileName);
    }

    loadImages(): void {
        this.getPositions();

        const carImageList: ImageList1[] = [
            { varName: this.carPic, file: "car.png" },
            { varName: this.secondCarPic, file: "redcar.png" },
        ];

        const trackImageList: ImageList2[] = [
            { trackType: Levels.track_Wall, file: "wall.png" },
            { trackType: Levels.track_Road, file: "road.png" },
            { trackType: Levels.track_Start, file: "start.png" },
            { trackType: Levels.track_Grass, file: "grass.png" },
        ];

        this.picsToLoad = carImageList.length + trackImageList.length;

        for (let image of carImageList) {
            this.loadImage(image.varName, image.file);
        }

        for (let image of trackImageList) {
            this.loadImageForTrackCode(image.trackType, image.file);
        }
    }

    setTrackGrid(trackGrid: number[]): void {
        this.trackGrid = trackGrid;
        this.getPositions();
    }

    getPositions(): void {
        this.startPositions = [];
        for (let i = 0; i < this.trackGrid.length; i++) {
            if (this.trackGrid[i] === Levels.track_Start) {
                this.startPositions.push(i);
            }
            if (this.startPositions.length >= 2) {
                break;
            }
        }
    }

    drawtracks(): void {
        let arrayIndex = 0;
        let drawTileX = 0;
        let drawTileY = 0;
        for (let j = 0; j < trackRows; j++) {
            for (let i = 0; i < trackColumns; i++) {
                const tileKind = this.trackGrid[arrayIndex];
                let useImg = this.trackPics[tileKind];
                this.context.drawImage(useImg, drawTileX, drawTileY);
                drawTileX += trackW;
                arrayIndex++;
            }
            drawTileY += trackH;
            drawTileX = 0;
        }
    }

    rowColToArrayIndex(col: number, row: number): number {
        return col + trackColumns * row;
    }

    returnTileTypeAtColRow(col: number, row: number): number {
        if (col >= 0 && col < trackColumns && row >= 0 && row < trackRows) {
            const trackIndexUnderCoord = this.rowColToArrayIndex(col, row);

            return this.trackGrid[trackIndexUnderCoord];
        } else {
            return Levels.track_Wall;
        }
    }
}
