import { Piece } from "../Piece.js";
import { newGame } from "../app.js";
export class Bishop extends Piece {
    constructor(color, currPos, name) {
        super(color, currPos, name);
    }
    onClick(e) {
        e.stopPropagation();
        console.log("%c DEBUT onClick(e) :", "color:green;font-weight: 800; font-size: 1.5em;");
        console.table(this);
        this.clearEvents();
        this.removeBalls();
        $(this.currPos).off();
        const allowedPos = this.getAllowedPos();
        const positions = allowedPos.flat();
        let dataset = positions.filter((elt) => {
            const id = "#" + elt.attr("id");
            if (id) {
                return this.displayPiece(id) == null;
            }
            return false;
        });
        this.displayBalls(dataset);
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
    move(e) {
        e.stopPropagation();
        this.removeBalls();
        if (this.displayPiece("#" + e.currentTarget.id)) {
            // ? S'il y a une pièce sur la case destination :
            $("#" + e.currentTarget.id).html("");
            const attackedPiece = this.displayPiece("#" + e.currentTarget.id);
            if (attackedPiece) {
                attackedPiece.currPos = "0";
            }
            $(this.currPos).children().appendTo(this.getID(e.currentTarget.id));
        }
        else {
            // ? Si la case de destination est vide
            $(this.currPos).children().appendTo(this.getID(e.currentTarget.id));
        }
        this.currPos = this.getID(e.currentTarget.id);
        if (this.color === "b") {
            newGame.color = "w";
        }
        else {
            newGame.color = "b";
        }
        this.clearEvents();
        this.addEvents(this.color === "b" ? "w" : "b");
    }
    getAllowedPos() {
        const currID = this.currPos;
        const color = this.color;
        let i = this.strToArr(currID)[0];
        let j = this.strToArr(currID)[1];
        let diag1 = [];
        let diag2 = [];
        let diag3 = [];
        let diag4 = [];
        for (let k = 1; k < 8; k++) {
            diag1.push([i - k, j + k]);
            diag2.push([i + k, j + k]);
            diag3.push([i + k, j - k]);
            diag4.push([i - k, j - k]);
        }
        diag1 = diag1.filter((elt) => {
            const cond1 = elt[0] >= 0 && 7 >= elt[0];
            const cond2 = elt[1] >= 0 && 7 >= elt[1];
            return cond1 && cond2;
        });
        diag2 = diag2.filter((elt) => {
            const cond1 = elt[0] >= 0 && 7 >= elt[0];
            const cond2 = elt[1] >= 0 && 7 >= elt[1];
            return cond1 && cond2;
        });
        diag3 = diag3.filter((elt) => {
            const cond1 = elt[0] >= 0 && 7 >= elt[0];
            const cond2 = elt[1] >= 0 && 7 >= elt[1];
            return cond1 && cond2;
        });
        diag4 = diag4.filter((elt) => {
            const cond1 = elt[0] >= 0 && 7 >= elt[0];
            const cond2 = elt[1] >= 0 && 7 >= elt[1];
            return cond1 && cond2;
        });
        diag1 = diag1.map((elt) => this.arrToStr(elt));
        diag2 = diag2.map((elt) => this.arrToStr(elt));
        diag3 = diag3.map((elt) => this.arrToStr(elt));
        diag4 = diag4.map((elt) => this.arrToStr(elt));
        let diags = [diag1, diag2, diag3, diag4];
        let positions = [];
        diags.forEach((diag) => {
            var _a;
            let diagBis = [];
            let k = 0;
            do {
                if (this.displayPiece(diag[k]) != null) {
                    if (((_a = this.displayPiece(diag[k])) === null || _a === void 0 ? void 0 : _a.color) != color) {
                        diagBis.push($(diag[k]));
                    }
                }
                else {
                    diagBis.push($(diag[k]));
                }
                k++;
            } while (k < diag.length && this.displayPiece(diag[k - 1]) == null);
            positions.push(diagBis);
        });
        return positions;
    }
}
