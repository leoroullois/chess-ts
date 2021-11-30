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
        console.log(this.displayPiece("#G1"));
    }
    move() { }
    /**
     * ? Parité : 1 si noir, -1 si blanc
     * @returns -1 ou 1
     */
    parite() {
        let s;
        if (this.color === "b" && this.delID(this.currPos) != "0") {
            s = 1;
        }
        else if (this.color == "w" && this.delID(this.currPos) != "0") {
            s = -1;
        }
        else {
            s = undefined;
        }
        return s;
    }
    getAllowedPos() {
        var _a, _b;
        const color = this.color;
        const index = this.count;
        const currID = this.currPos;
        const s = this.parite();
        let positions = new Array();
        let upPos, upUpPos, firstAttack, secondAttack;
        if (s) {
            const upID = this.changePos(currID, 0, s * 1);
            if (upID) {
                upPos = $(upID);
            }
            const upUpID = this.changePos(currID, 0, s * 2);
            if (upUpID) {
                upUpPos = $(upUpID);
            }
            // * Attaques
            let attackID = this.changePos(currID, 1, s * 1);
            firstAttack = attackID ? $(attackID) : undefined;
            attackID = this.changePos(currID, -1, s * 1);
            secondAttack = attackID ? $(attackID) : undefined;
        }
        // Si la case upPos est livre :
        if ((upPos === null || upPos === void 0 ? void 0 : upPos.html()) == "") {
            positions.push([upPos]);
            if ((upUpPos === null || upUpPos === void 0 ? void 0 : upUpPos.html()) == "" && index == 0) {
                positions[0].push(upUpPos);
            }
        }
        else {
            positions.push([]);
        }
        // Si la pièce a manger est de la couleur opposée ET non vide :
        const x = (_a = firstAttack === null || firstAttack === void 0 ? void 0 : firstAttack.children()) === null || _a === void 0 ? void 0 : _a.attr("alt");
        const y = (_b = secondAttack === null || secondAttack === void 0 ? void 0 : secondAttack.children()) === null || _b === void 0 ? void 0 : _b.attr("alt");
        if (firstAttack != undefined &&
            firstAttack.html() != "" &&
            firstAttack.html() != this.ball &&
            x &&
            x[0] != color) {
            positions.push([firstAttack]);
            if (secondAttack != undefined &&
                secondAttack.html() != "" &&
                secondAttack.html() != this.ball &&
                y &&
                y[0] != color) {
                positions[1].push(secondAttack);
            }
        }
        else if (secondAttack != undefined &&
            secondAttack.html() != "" &&
            secondAttack.html() != this.ball &&
            y &&
            y[0] != color &&
            positions.length == 1) {
            positions.push([secondAttack]);
        }
        else {
            positions.push([]);
        }
        return positions;
    }
}
