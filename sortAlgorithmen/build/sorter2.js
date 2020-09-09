"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sorter2 = void 0;
var Sorter2 = /** @class */ (function () {
    function Sorter2() {
    }
    Sorter2.prototype.bubbleSort = function () {
        var length = this.length;
        var swaped;
        do {
            swaped = false;
            for (var i = 0; i < length - 1; i++) {
                if (this.compare(i, i + 1)) {
                    this.swap(i, i + 1);
                    swaped = true;
                }
            }
            length--;
        } while (swaped);
    };
    return Sorter2;
}());
exports.Sorter2 = Sorter2;
