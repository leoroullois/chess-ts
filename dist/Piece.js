import { newGame } from "./app.js";
export class Piece {
    constructor(color, currPos, name) {
        this._color = color;
        this._currPos = currPos;
        this._name = name;
        this._ball = '<div class="ball"></div>';
    }
    // ? Getters et setters
    get color() {
        return this._color;
    }
    set currPos(pPos) {
        this._currPos = pPos;
    }
    get currPos() {
        return this._currPos;
    }
    get name() {
        return this._name;
    }
    /**
     * * Récupère la case de la pièce.
     * @returns la case (élément HTML) où se trouve la pièce
     */
    getHTML() {
        if (this._currPos === "0") {
            return undefined;
        }
        else {
            return $(this._currPos).html();
        }
    }
    /**
     * ? Permet de connaîte "l'identité" d'un mouvement.
     * @param pMove Pièce a laquelle on souhaite bouger
     * @returns Un string du genre "BxA3"
     */
    getMoveString(pMove) {
        // TODO: si la pièce est occupée par une pièce
        return this._name + pMove;
    }
    getID(id) {
        return `#${id}`;
    }
    delID(id) {
        return id.slice(1, 3);
    }
    /**
     * ? "#A1" => [0,0]
     * @param caseString "#A1"
     * @returns [0,0]
     */
    strToArr(caseString) {
        let caseCoords = this.delID(caseString).split("");
        let x = caseCoords[0].charCodeAt(0) - 65;
        let y = Number(caseCoords[1]) - 1;
        return [x, y];
    }
    /**
     * ? [0,0] => "#A1"
     * @param coords [0,0]
     * @returns "#A1"
     */
    arrToStr(coords) {
        let i = String.fromCharCode(coords[0] + 65);
        let j = (coords[1] + 1).toString();
        return "#" + i + j;
    }
    /**
     * ? Affiche des boules sur les cases du tableau
     * @param cases tableau d'éléments jQuery
     */
    displayBalls(cases) {
        cases === null || cases === void 0 ? void 0 : cases.forEach((elt) => {
            elt === null || elt === void 0 ? void 0 : elt.html(this._ball);
        });
    }
    /**
     * ? Permet de récupérer la pièce d'une case.
     * @param id "#A1"
     * @returns la pièce se trouvant à l'id ou null
     */
    displayPiece(id) {
        let myPiece = null;
        if (id == undefined) {
            return myPiece;
        }
        newGame.allPieces.forEach((elt) => {
            if (elt.currPos == id) {
                myPiece = elt;
            }
        });
        return myPiece;
    }
}
