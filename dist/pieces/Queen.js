import { Piece } from "../Piece.js";
export class Queen extends Piece {
    constructor(color, currPos, name) {
        super(color, currPos, name);
    }
    onClick(e) {
        console.log(e);
        console.log("move queen");
    }
    move() { }
    getAllowedPos1() {
        var _a, _b, _c, _d;
        const currID = this.currPos;
        const color = this.color;
        let i = this.strToArr(currID)[0];
        let j = this.strToArr(currID)[1];
        let diag1 = [];
        let diag2 = [];
        let diag3 = [];
        let diag4 = [];
        for (let k = 0; k < 8; k++) {
            diag1.push([i - k, j + k]);
            diag2.push([i + k, j + k]);
            diag3.push([i + k, j - k]);
            diag4.push([i - k, j - k]);
        }
        ;
        diag1 = diag1.filter((elt) => {
            return this.arrToStr(elt) != undefined;
        });
        diag2 = diag2.filter((elt) => {
            return this.arrToStr(elt) != undefined;
        });
        diag3 = diag3.filter((elt) => {
            return this.arrToStr(elt) != undefined;
        });
        diag4 = diag4.filter((elt) => {
            return this.arrToStr(elt) != undefined;
        });
        diag1 = diag1.map((elt) => this.arrToStr(elt));
        diag2 = diag2.map((elt) => this.arrToStr(elt));
        diag3 = diag3.map((elt) => this.arrToStr(elt));
        diag4 = diag4.map((elt) => this.arrToStr(elt));
        let diag1Bis = [];
        let k = 0;
        do {
            k++;
            if (this.displayPiece(diag1[k]) != undefined) {
                if (((_a = this.displayPiece(diag1[k])) === null || _a === void 0 ? void 0 : _a.color) != color) {
                    diag1Bis.push($(diag1[k]));
                }
                ;
            }
            else {
                diag1Bis.push($(diag1[k]));
            }
            ;
        } while (k < diag1.length && this.displayPiece(diag1[k]) == undefined);
        let diag2Bis = [];
        k = 0;
        do {
            k++;
            if (this.displayPiece(diag2[k]) != undefined) {
                if (((_b = this.displayPiece(diag2[k])) === null || _b === void 0 ? void 0 : _b.color) != color) {
                    diag2Bis.push($(diag2[k]));
                }
                ;
            }
            else {
                diag2Bis.push($(diag2[k]));
            }
            ;
        } while (k < diag2.length && this.displayPiece(diag2[k]) == undefined);
        let diag3Bis = [];
        k = 0;
        do {
            k++;
            if (this.displayPiece(diag3[k]) != undefined) {
                if (((_c = this.displayPiece(diag3[k])) === null || _c === void 0 ? void 0 : _c.color) != color) {
                    diag3Bis.push($(diag3[k]));
                }
                ;
            }
            else {
                diag3Bis.push($(diag3[k]));
            }
            ;
        } while (k < diag3.length && this.displayPiece(diag3[k]) == undefined);
        let diag4Bis = [];
        k = 0;
        do {
            k++;
            if (this.displayPiece(diag4[k]) != undefined) {
                if (((_d = this.displayPiece(diag4[k])) === null || _d === void 0 ? void 0 : _d.color) != color) {
                    diag4Bis.push($(diag4[k]));
                }
                ;
            }
            else {
                diag4Bis.push($(diag4[k]));
            }
            ;
        } while (k < diag4.length && this.displayPiece(diag4[k]) == undefined);
        let positions = [diag1Bis, diag2Bis, diag3Bis, diag4Bis];
        return positions;
    }
    ;
    getAllowedPos2() {
        var _a, _b, _c, _d;
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
        ;
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
        let row1Bis = [];
        let k = 0;
        do {
            k++;
            if (this.displayPiece(row1[k]) != undefined) {
                if (((_a = this.displayPiece(row1[k])) === null || _a === void 0 ? void 0 : _a.color) != color) {
                    row1Bis.push($(row1[k]));
                }
                ;
            }
            else {
                row1Bis.push($(row1[k]));
            }
            ;
        } while (k < row1.length && this.displayPiece(row1[k]) == undefined);
        let row2Bis = [];
        k = 0;
        do {
            k++;
            if (this.displayPiece(row2[k]) != undefined) {
                if (((_b = this.displayPiece(row2[k])) === null || _b === void 0 ? void 0 : _b.color) != color) {
                    row2Bis.push($(row2[k]));
                }
                ;
            }
            else {
                row2Bis.push($(row2[k]));
            }
            ;
        } while (k < row2.length && this.displayPiece(row2[k]) == undefined);
        let row3Bis = [];
        k = 0;
        do {
            k++;
            if (this.displayPiece(row3[k]) != undefined) {
                if (((_c = this.displayPiece(row3[k])) === null || _c === void 0 ? void 0 : _c.color) != color) {
                    row3Bis.push($(row3[k]));
                }
                ;
            }
            else {
                row3Bis.push($(row3[k]));
            }
            ;
        } while (k < row3.length && this.displayPiece(row3[k]) == undefined);
        let row4Bis = [];
        k = 0;
        do {
            k++;
            if (this.displayPiece(row4[k]) != undefined) {
                if (((_d = this.displayPiece(row4[k])) === null || _d === void 0 ? void 0 : _d.color) != color) {
                    row4Bis.push($(row4[k]));
                }
                ;
            }
            else {
                row4Bis.push($(row4[k]));
            }
            ;
        } while (k < row4.length && this.displayPiece(row4[k]) == undefined);
        let positions = [row1Bis, row2Bis, row3Bis, row4Bis];
        return positions;
    }
    ;
    getAllowedPos() {
        const pos1 = this.getAllowedPos1();
        const pos2 = this.getAllowedPos2();
        let positions = pos1.concat(pos2);
        return positions;
    }
}
