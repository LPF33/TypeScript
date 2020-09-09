export abstract class Sorter2 {
    abstract compare(leftIndex: number, rightIndex: number): boolean;
    abstract swap(leftIndex: number, rightIndex: number): void;
    abstract length: number;

    bubbleSort(): void {
        let { length } = this;
        let swaped;
        do {
            swaped = false;
            for (let i = 0; i < length - 1; i++) {
                if (this.compare(i, i + 1)) {
                    this.swap(i, i + 1);
                    swaped = true;
                }
            }
            length--;
        } while (swaped);
    }
}
