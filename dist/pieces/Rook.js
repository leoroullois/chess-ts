import { Piece } from "../Piece.js";
export class Rook extends Piece {
    constructor(color, currPos, name) {
        super(color, currPos, name);
        this._count = 0;
    }
    get count() {
        return this._count;
    }
    onClick(e) {
        console.log(e);
    }
    move() { }
}
