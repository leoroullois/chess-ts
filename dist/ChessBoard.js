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
        const pa = new Pawn("black", "#A7", "pa");
        const pb = new Pawn("black", "#B7", "pb");
        const pc = new Pawn("black", "#C7", "pc");
        const pd = new Pawn("black", "#D7", "pd");
        const pe = new Pawn("black", "#E7", "pe");
        const pf = new Pawn("black", "#F7", "pf");
        const pg = new Pawn("black", "#G7", "pg");
        const ph = new Pawn("black", "#H7", "ph");
        const ra = new Rook("black", "#A8", "ra");
        const rh = new Rook("black", "#H8", "Z");
        const kb = new Knight("black", "#B8", "Z");
        const kg = new Knight("black", "#G8", "Z");
        const bc = new Bishop("black", "#C8", "Z");
        const bf = new Bishop("black", "#F8", "Z");
        const ke = new King("black", "#E8", "Z");
        const qd = new Queen("black", "#D8", "Z");
        const Pa = new Pawn("white", "#A2", "Z");
        const Pb = new Pawn("white", "#B2", "Z");
        const Pc = new Pawn("white", "#C2", "Z");
        const Pd = new Pawn("white", "#D2", "Z");
        const Pe = new Pawn("white", "#E2", "Z");
        const Pf = new Pawn("white", "#F2", "Z");
        const Pg = new Pawn("white", "#G2", "Z");
        const Ph = new Pawn("white", "#H2", "Z");
        const Ra = new Rook("white", "#A1", "Z");
        const Rh = new Rook("white", "#H1", "Z");
        const Kb = new Knight("white", "#B1", "Z");
        const Kg = new Knight("white", "#G1", "Z");
        const Bc = new Bishop("white", "#C1", "Z");
        const Bf = new Bishop("white", "#F1", "Z");
        const Ke = new King("white", "#E1", "Z");
        const Qd = new Queen("white", "#D1", "Z");
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
        this._allPieces.forEach((elt) => {
            $(elt.currPos).on("click", elt.onClick);
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
        return this.fen.split(" ")[1];
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
    getWhiteRoc() { }
    getBlackRoc() { }
    inCheck() { }
    inCheckMate() { }
}
