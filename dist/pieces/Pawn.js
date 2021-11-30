import { newGame } from "../app.js";
import { Piece } from "../Piece.js";
export class Pawn extends Piece {
    constructor(color, currPos, name) {
        super(color, currPos, name);
        this._count = 0;
        this._promoted = false;
        this._enPassant = false;
    }
    // Getters and setters
    get count() {
        return this._count;
    }
    get promoted() {
        return this._promoted;
    }
    get enPassant() {
        return this._enPassant;
    }
    onClick(e) {
        console.log(e);
        console.log(newGame.allPieces);
    }
    move() { }
}
