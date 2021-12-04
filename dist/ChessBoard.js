import { Rook } from "./pieces/Rook.js";
import { Queen } from "./pieces/Queen.js";
import { Pawn } from "./pieces/Pawn.js";
import { Knight } from "./pieces/Knight.js";
import { King } from "./pieces/King.js";
import { Bishop } from "./pieces/Bishop.js";
export class ChessBoard {
    constructor(fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1") {
        this._fen = fen;
        this._allMoves = [];
        this._chessBoard = [
            ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1"],
            ["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2"],
            ["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3"],
            ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4"],
            ["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5"],
            ["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6"],
            ["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7"],
            ["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8"],
        ];
        const pa = new Pawn("b", "#A7", "Pawn");
        const pb = new Pawn("b", "#B7", "Pawn");
        const pc = new Pawn("b", "#C7", "Pawn");
        const pd = new Pawn("b", "#D7", "Pawn");
        const pe = new Pawn("b", "#E7", "Pawn");
        const pf = new Pawn("b", "#F7", "Pawn");
        const pg = new Pawn("b", "#G7", "Pawn");
        const ph = new Pawn("b", "#H7", "Pawn");
        const ra = new Rook("b", "#A8", "Rook");
        const rh = new Rook("b", "#H8", "Rook");
        const kb = new Knight("b", "#B8", "Knight");
        const kg = new Knight("b", "#G8", "Knight");
        const bc = new Bishop("b", "#C8", "Bishop");
        const bf = new Bishop("b", "#F8", "Bishop");
        const ke = new King("b", "#E8", "King");
        const qd = new Queen("b", "#D8", "Queen");
        const Pa = new Pawn("w", "#A2", "Pawn");
        const Pb = new Pawn("w", "#B2", "Pawn");
        const Pc = new Pawn("w", "#C2", "Pawn");
        const Pd = new Pawn("w", "#D2", "Pawn");
        const Pe = new Pawn("w", "#E2", "Pawn");
        const Pf = new Pawn("w", "#F2", "Pawn");
        const Pg = new Pawn("w", "#G2", "Pawn");
        const Ph = new Pawn("w", "#H2", "Pawn");
        const Ra = new Rook("w", "#A1", "Rook");
        const Rh = new Rook("w", "#H1", "Rook");
        const Kb = new Knight("w", "#B1", "Knight");
        const Kg = new Knight("w", "#G1", "Knight");
        const Bc = new Bishop("w", "#C1", "Bishop");
        const Bf = new Bishop("w", "#F1", "Bishop");
        const Ke = new King("w", "#E1", "King");
        const Qd = new Queen("w", "#D1", "Queen");
        this._blackPieces = [
            ra,
            rh,
            kb,
            kg,
            bc,
            bf,
            ke,
            qd,
            pa,
            pb,
            pc,
            pd,
            pe,
            pf,
            pg,
            ph,
        ];
        this._whitePieces = [
            Ra,
            Rh,
            Kb,
            Kg,
            Bc,
            Bf,
            Ke,
            Qd,
            Pa,
            Pb,
            Pc,
            Pd,
            Pe,
            Pf,
            Pg,
            Ph,
        ];
        this._whitePawns = [Pa, Pb, Pc, Pd, Pe, Pf, Pg, Ph];
        this._blackPawns = [pa, pb, pc, pd, pe, pf, pg, ph];
        this._allPieces = this._blackPieces.concat(this._whitePieces);
        this._whitePieces.forEach((elt) => {
            $(elt.currPos).on("click", elt.onClick.bind(elt));
        });
    }
    // Getters and setters
    get fen() {
        return this._fen;
    }
    get position() {
        return this.fen.split(" ")[0];
    }
    set position(v) {
        this._fen =
            v +
                this.color +
                this.roc +
                this.enPassant +
                this.halfMove +
                this.fullMove;
    }
    get color() {
        return this._fen.split(" ")[1];
    }
    set color(v) {
        this._fen =
            this.position +
                v +
                this.roc +
                this.enPassant +
                this.halfMove +
                this.fullMove;
    }
    get roc() {
        return this.fen.split(" ")[2];
    }
    set roc(v) {
        this._fen =
            this.position +
                this.color +
                v +
                this.enPassant +
                this.halfMove +
                this.fullMove;
    }
    get enPassant() {
        return this.fen.split(" ")[3];
    }
    set enPassant(v) {
        this._fen =
            this.position + this.color + this.roc + v + this.halfMove + this.fullMove;
    }
    get halfMove() {
        return this.fen.split(" ")[4];
    }
    set halfMove(v) {
        this._fen =
            this.position +
                this.color +
                this.roc +
                this.enPassant +
                v +
                this.fullMove;
    }
    get fullMove() {
        return this.fen.split(" ")[5];
    }
    set fullMove(v) {
        this._fen =
            this.position +
                this.color +
                this.roc +
                this.enPassant +
                this.halfMove +
                v;
    }
    get allMoves() {
        return this._allMoves;
    }
    get whitePawns() {
        return this._whitePawns;
    }
    get blackPawns() {
        return this._blackPawns;
    }
    set allMoves(v) {
        this._allMoves = v;
    }
    get chessBoard() {
        return this._chessBoard;
    }
    get allPieces() {
        return this._allPieces;
    }
    get whitePieces() {
        return this._whitePieces;
    }
    get blackPieces() {
        return this._blackPieces;
    }
    getWhiteRoc() { }
    getBlackRoc() { }
    inCheck() { }
    inCheckMate() { }
    /**
     *
     * @returns
     */
    otherPositions() {
        let pieces = [];
        for (let i = 0; i < this.chessBoard.length; i++) {
            for (let j = 0; j < this.chessBoard[i].length; j++) {
                const myPiece = $("#" + this.chessBoard[i][j]);
                if (myPiece.html() == "") {
                    const id = myPiece.attr("id");
                    id && pieces.push(id);
                }
            }
        }
        return pieces;
    }
}
