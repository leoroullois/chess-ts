import { Piece } from "../Piece.js";
import { newGame } from "../app.js";
export class King extends Piece {
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
        let positions = [];
        positions.push([i + 1, j]);
        positions.push([i - 1, j]);
        positions.push([i, j - 1]);
        positions.push([i, j + 1]);
        positions.push([i + 1, j + 1]);
        positions.push([i + 1, j - 1]);
        positions.push([i - 1, j + 1]);
        positions.push([i - 1, j - 1]);
        positions = positions.filter((elt) => {
            const cond1 = elt[0] >= 0 && 7 >= elt[0];
            const cond2 = elt[1] >= 0 && 7 >= elt[1];
            return cond1 && cond2;
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
