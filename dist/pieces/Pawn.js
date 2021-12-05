import { Queen } from "./Queen.js";
import { newGame } from "../app.js";
import { Piece } from "../Piece.js";
export class Pawn extends Piece {
    constructor(color, currPos, name) {
        super(color, currPos, name);
        this._count = 0;
        this._promoted = false;
        this._enPassant = { p1: null, p2: null, passant: false };
    }
    // Getters and setters
    get count() {
        return this._count;
    }
    set count(v) {
        this._count = v;
    }
    get promoted() {
        return this._promoted;
    }
    get enPassant() {
        return this._enPassant;
    }
    set enPassant(v) {
        this._enPassant = v;
    }
    /**
     * Prise en passant.
     * @returns Un objet qui représente toute les informations a propos de la prise en passant
     */
    getEnPassant() {
        console.log("GetEnPassant() :");
        let s = this.parite();
        const id1 = this.changePos(this.currPos, s, 0);
        let piece1 = null;
        if (id1) {
            piece1 = this.displayPiece(id1);
        }
        const id2 = this.changePos(this.currPos, -s, 0);
        let piece2 = null;
        if (id2) {
            piece2 = this.displayPiece(id2);
        }
        // ? Si la pièce est un pion de couleur opposée, a été déplacée qu'une fois, de deux cases, au dernier coup
        const whiteCondition = this.currPos[2] === "5" && this.color === "w";
        const blackCondition = this.currPos[2] === "4" && this.color === "b";
        if (whiteCondition || blackCondition) {
            if (piece1 &&
                piece1.name === "Pawn" &&
                this.color != piece1.color &&
                piece1.enPassant.passant === true) {
                const id = this.changePos(this.currPos, s, s);
                if (id && $(id).html() == "") {
                    return { p1: $(id), p2: null, passant: false };
                }
                else {
                    return { p1: null, p2: null, passant: false };
                }
            }
            else if (piece2 &&
                piece2.name === "Pawn" &&
                this.color != piece2.color &&
                piece2.enPassant.passant === true) {
                const id = this.changePos(this.currPos, -s, s);
                if (id && $(id).html() == "") {
                    return { p1: null, p2: $(id), passant: false };
                }
                else {
                    return { p1: null, p2: null, passant: false };
                }
            }
        }
        return { p1: null, p2: null, passant: false };
    }
    /**
     * Gère la dispositions des petites boules et des nouveaux événements
     * @param e événement de click sur une pièce
     */
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
        this.displayBalls(allowedPos[0]);
        this.enPassant = this.getEnPassant();
        const s = this.parite();
        if (this.enPassant.p1) {
            if (s) {
                const newPos = this.changePos(this.currPos, s, s);
                if (newPos) {
                    this.enPassant.p1 = $(newPos);
                }
            }
        }
        if (this.enPassant.p2) {
            if (s) {
                const newPos = this.changePos(this.currPos, -s, s);
                if (newPos) {
                    this.enPassant.p2 = $(newPos);
                }
            }
        }
        if (this.enPassant.p1 != null) {
            this.enPassant.p1.html(this.ball);
            this.enPassant.p1.on("click", this.move);
        }
        if (this.enPassant.p2 != null) {
            this.enPassant.p2.html(this.ball);
            this.enPassant.p2.on("click", this.move);
        }
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
    /**
     * Procédure faisant bouger la pièce à l'endroit souhaiter et mets à jours toute les informations
     * @param e événement de click sur la case de destination
     */
    move(e) {
        e.stopPropagation();
        this.removeBalls();
        const s = this.parite();
        // ? Prise en passant
        if (this.enPassant.p1) {
            const attackedPos = this.changePos(this.currPos, s, 0);
            if (attackedPos) {
                $(attackedPos).html("");
                const attackedPiece = this.displayPiece(attackedPos);
                if (attackedPiece) {
                    attackedPiece.currPos = "0";
                }
            }
            $(this.currPos)
                .children()
                .appendTo("#" + e.currentTarget.id);
        }
        else if (this.enPassant.p2) {
            if (s) {
                const attackedPos = this.changePos(this.currPos, -s, 0);
                if (attackedPos) {
                    $(attackedPos).html("");
                    const attackedPiece = this.displayPiece(attackedPos);
                    if (attackedPiece) {
                        attackedPiece.currPos = "0";
                    }
                }
                $(this.currPos)
                    .children()
                    .appendTo("#" + e.currentTarget.id);
            }
        }
        else if (this.currPos[2] === "7" && this.color === "w") {
            // ? Promotion en dame
            console.log("Promotion dame");
            const queen = new Queen("w", "#" + e.currentTarget.id, "Queen");
            // ? Remplace le pion par une dame
            const indexAllPieces = newGame.allPieces.indexOf(this);
            const indexWhitePieces = newGame.whitePieces.indexOf(this);
            if (indexAllPieces != -1) {
                newGame.allPieces[indexAllPieces] = queen;
            }
            if (indexWhitePieces != -1) {
                newGame.whitePieces[indexWhitePieces] = queen;
            }
            // ? "Supprime" le pion
            $(this.currPos).html("");
            $("#" + e.currentTarget.id).html('<img src="//images.chesscomfiles.com/chess-themes/pieces/neo/150/wq.png" alt="white queen">');
            this.currPos = "0";
            this._promoted = true;
            this.count++;
        }
        else if (this.currPos[2] === "2" && this.color === "b") {
            console.log("Promotion dame");
            const queen = new Queen("b", "#" + e.currentTarget.id, "Queen");
            // ? Remplace le pion par une dame.
            const indexAllPieces = newGame.allPieces.indexOf(this);
            const indexBlackPieces = newGame.blackPieces.indexOf(this);
            console.log(indexAllPieces);
            console.log(indexBlackPieces);
            if (indexAllPieces != -1) {
                newGame.allPieces[indexAllPieces] = queen;
            }
            if (indexBlackPieces != -1) {
                newGame.blackPieces[indexBlackPieces] = queen;
            }
            // ? "Supprime" le pion
            $(this.currPos).html("");
            $("#" + e.currentTarget.id).html('<img src="//images.chesscomfiles.com/chess-themes/pieces/neo/150/bq.png" alt="black queen">');
            this.currPos = "0";
            this._promoted = true;
            this.count++;
        }
        else if (this.displayPiece("#" + e.currentTarget.id)) {
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
        this.count++;
        if (this.currPos[2] === "4" && this.color === "w" && this.count === 1) {
            this.enPassant = { p1: null, p2: null, passant: true };
        }
        else if (this.currPos[2] === "5" &&
            this.color === "b" &&
            this.count === 1) {
            this.enPassant = { p1: null, p2: null, passant: true };
        }
        else {
            this.enPassant = { p1: null, p2: null, passant: false };
        }
        if (this.color === "b") {
            newGame.color = "w";
        }
        else {
            newGame.color = "b";
        }
        this.clearEvents();
        this.addEvents(this.color === "b" ? "w" : "b");
    }
    /**
     * ? Parité : 1 si noir, -1 si blanc
     * @returns -1 ou 1
     */
    parite() {
        if (this.color === "b") {
            return 1;
        }
        return -1;
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
