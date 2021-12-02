import { Piece } from "../Piece.js";
export class Knight extends Piece {
    constructor(color, currPos, name) {
        super(color, currPos, name);
    }
    onClick(e) {
        console.log(e);
        const allPos = this.getAllowedPos();
        console.log(allPos);
    }
    move() { }
    getAllowedPos() {
        const currID = this.currPos;
        const color = this.color;
        let i = this.strToArr(currID)[0];
        let j = this.strToArr(currID)[1];
        let positions = [];
        positions.push([i - 1, j + 2]);
        positions.push([i + 1, j + 2]);
        positions.push([i + 2, j + 1]);
        positions.push([i + 2, j - 1]);
        positions.push([i + 1, j - 2]);
        positions.push([i - 1, j - 2]);
        positions.push([i - 2, j - 1]);
        positions.push([i - 2, j + 1]);
        positions = positions.filter((elt) => {
            return this.arrToStr(elt) != undefined;
        });
        let positions2 = positions.map((elt) => this.arrToStr(elt));
        positions2 = positions2.filter((elt) => {
            const piece = this.displayPiece(elt);
            return (piece === null || piece === void 0 ? void 0 : piece.color) != color;
        });
        let positions3 = positions2.map((elt) => $(elt));
        return [positions3];
    }
}
