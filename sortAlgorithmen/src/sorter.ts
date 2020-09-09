interface Sortable {
    length: number;
    compare(leftIndex: number, rightIndex: number): boolean;
    swap(leftIndex: number, rightIndex: number): void;
}

export class Sorter {
    constructor(public collection: Sortable) {}

    bubbleSort(): void {
        let { length } = this.collection;
        let swaped;
        do {
            swaped = false;
            for (let i = 0; i < length - 1; i++) {
                if (this.collection.compare(i, i + 1)) {
                    this.collection.swap(i, i + 1);
                    swaped = true;
                }
            }
            length--;
        } while (swaped);
    }
}
