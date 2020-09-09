import { Sorter2 } from "./sorter2";

export class CharactersCollection extends Sorter2 {
    constructor(public data: string) {
        super();
    }

    get length(): number {
        return this.data.length;
    }

    compare(leftIndex: number, rightIndex: number): boolean {
        return (
            this.data[leftIndex].toLowerCase() >
            this.data[rightIndex].toLowerCase()
        );
    }

    swap(leftIndex: number, rightIndex: number): void {
        const charArray = this.data.split("");
        const leftSide = charArray[leftIndex];
        charArray[leftIndex] = charArray[rightIndex];
        charArray[rightIndex] = leftSide;
        this.data = charArray.join("");
    }
}
