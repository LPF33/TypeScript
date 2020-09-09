"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sorter = void 0;
var Sorter = /** @class */ (function () {
    function Sorter(collection) {
        this.collection = collection;
    }
    Sorter.prototype.bubbleSort = function () {
        var length = this.collection.length;
        var swaped;
        do {
            swaped = false;
            for (var i = 0; i < length - 1; i++) {
                if (this.collection.compare(i, i + 1)) {
                    this.collection.swap(i, i + 1);
                    swaped = true;
                }
            }
            length--;
        } while (swaped);
    };
    return Sorter;
}());
exports.Sorter = Sorter;
