import { Piece } from "../Piece.js";
export class Knight extends Piece {
    constructor(color, currPos, name) {
        super(color, currPos, name);
    }
    onClick(e) {
        console.log(e);
    }
    move() { }
}
