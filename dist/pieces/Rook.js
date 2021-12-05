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
        e.stopPropagation();
        console.log("%c DEBUT onClick(e) :", "color:green;font-weight: 800; font-size: 1.5em;");
        console.table(this);
        this.clearEvents();
        this.removeBalls();
        $(this.currPos).off();
        // Récup tous les coups possibles [["A1","A2"],["B3"]] avec les endroits vides et les endroits à attaquer
        const allowedPos = this.getAllowedPos();
        const positions = allowedPos[0].concat(allowedPos[1]);
        console.log(allowedPos);
        this.displayBalls(allowedPos[0]);
        positions.forEach((elt) => {
            elt.on("click", this.move);
        });
        this.getEmptyCases().forEach((elt) => {
            elt.on("click", () => {
                this.removeBalls();
                this.clearEvents();
                this.addEvents(this.color);
            });
        });
        console.log("%c FIN ONCLICK.", "color:green;font-weight: 800; font-size: 1.5em;");
    }
    move() { }
    getAllowedPos() {
        const currID = this.currPos;
        const color = this.color;
        let i = this.strToArr(currID)[0];
        let j = this.strToArr(currID)[1];
        let row1 = [];
        let row2 = [];
        let row3 = [];
        let row4 = [];
        for (let k = 0; k < 8; k++) {
            row1.push([i, j + k]);
            row2.push([i, j - k]);
            row3.push([i + k, j]);
            row4.push([i - k, j]);
        }
        row1 = row1.filter((elt) => {
            return this.arrToStr(elt) != undefined;
        });
        row2 = row2.filter((elt) => {
            return this.arrToStr(elt) != undefined;
        });
        row3 = row3.filter((elt) => {
            return this.arrToStr(elt) != undefined;
        });
        row4 = row4.filter((elt) => {
            return this.arrToStr(elt) != undefined;
        });
        row1 = row1.map((elt) => this.arrToStr(elt));
        row2 = row2.map((elt) => this.arrToStr(elt));
        row3 = row3.map((elt) => this.arrToStr(elt));
        row4 = row4.map((elt) => this.arrToStr(elt));
        let positions = [];
        let pos = [row1, row2, row3, row4];
        pos.forEach((row) => {
            var _a;
            let k = 0;
            let rowBis = [];
            do {
                k++;
                if (this.displayPiece(row[k]) != undefined) {
                    if (((_a = this.displayPiece(row[k])) === null || _a === void 0 ? void 0 : _a.color) != color) {
                        rowBis.push($(row[k]));
                    }
                }
                else {
                    rowBis.push($(row[k]));
                }
            } while (k < row.length && this.displayPiece(row[k]) == undefined);
            positions.push(rowBis);
        });
        return positions;
    }
}
