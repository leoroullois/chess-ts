import { Piece } from "../Piece.js";
export class Knight extends Piece {
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
