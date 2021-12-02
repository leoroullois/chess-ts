import { Rook } from "./pieces/Rook.js";
import { Queen } from "./pieces/Queen.js";
import { Pawn } from "./pieces/Pawn.js";
import { Knight } from "./pieces/Knight.js";
import { King } from "./pieces/King.js";
import { Bishop } from "./pieces/Bishop.js";
import { Piece } from "./Piece.js";

export class ChessBoard {
	private _chessBoard: string[][];
	private _fen: string;
	private _allMoves: string[];
	private _blackPieces: Piece[];
	private _whitePieces: Piece[];
	private _whitePawns: Piece[];
	private _blackPawns: Piece[];
	private _allPieces: Piece[];
	constructor(
		fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
	) {
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
		const pa = new Pawn("b", "#A7", "pa");
		const pb = new Pawn("b", "#B7", "pb");
		const pc = new Pawn("b", "#C7", "pc");
		const pd = new Pawn("b", "#D7", "pd");
		const pe = new Pawn("b", "#E7", "pe");
		const pf = new Pawn("b", "#F7", "pf");
		const pg = new Pawn("b", "#G7", "pg");
		const ph = new Pawn("b", "#H7", "ph");
		const ra = new Rook("b", "#A8", "ra");
		const rh = new Rook("b", "#H8", "Z");
		const kb = new Knight("b", "#B8", "Z");
		const kg = new Knight("b", "#G8", "Z");
		const bc = new Bishop("b", "#C8", "Z");
		const bf = new Bishop("b", "#F8", "Z");
		const ke = new King("b", "#E8", "Z");
		const qd = new Queen("b", "#D8", "Z");

		const Pa = new Pawn("w", "#A2", "Z");
		const Pb = new Pawn("w", "#B2", "Z");
		const Pc = new Pawn("w", "#C2", "Z");
		const Pd = new Pawn("w", "#D2", "Z");
		const Pe = new Pawn("w", "#E2", "Z");
		const Pf = new Pawn("w", "#F2", "Z");
		const Pg = new Pawn("w", "#G2", "Z");
		const Ph = new Pawn("w", "#H2", "Z");
		const Ra = new Rook("w", "#A1", "Z");
		const Rh = new Rook("w", "#H1", "Z");
		const Kb = new Knight("w", "#B1", "Z");
		const Kg = new Knight("w", "#G1", "Z");
		const Bc = new Bishop("w", "#C1", "Z");
		const Bf = new Bishop("w", "#F1", "Z");
		const Ke = new King("w", "#E1", "Z");
		const Qd = new Queen("w", "#D1", "Z");
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
		this._whitePieces.forEach((elt: Piece) => {
			$(elt.currPos).on("click", elt.onClick.bind(elt));
		});
	}
	// Getters and setters
	public get fen(): string {
		return this._fen;
	}
	public get position(): string {
		return this.fen.split(" ")[0];
	}
	public set position(v: string) {
		this._fen =
			v +
			this.color +
			this.roc +
			this.enPassant +
			this.halfMove +
			this.fullMove;
	}
	public get color(): string {
		return this._fen.split(" ")[1];
	}
	public set color(v: string) {
		this._fen =
			this.position +
			v +
			this.roc +
			this.enPassant +
			this.halfMove +
			this.fullMove;
	}
	public get roc(): string {
		return this.fen.split(" ")[2];
	}
	public set roc(v: string) {
		this._fen =
			this.position +
			this.color +
			v +
			this.enPassant +
			this.halfMove +
			this.fullMove;
	}
	public get enPassant(): string {
		return this.fen.split(" ")[3];
	}
	public set enPassant(v: string) {
		this._fen =
			this.position + this.color + this.roc + v + this.halfMove + this.fullMove;
	}
	public get halfMove(): string {
		return this.fen.split(" ")[4];
	}
	public set halfMove(v: string) {
		this._fen =
			this.position +
			this.color +
			this.roc +
			this.enPassant +
			v +
			this.fullMove;
	}
	public get fullMove(): string {
		return this.fen.split(" ")[5];
	}
	public set fullMove(v: string) {
		this._fen =
			this.position +
			this.color +
			this.roc +
			this.enPassant +
			this.halfMove +
			v;
	}
	public get allMoves(): string[] {
		return this._allMoves;
	}
	public get whitePawns(): Piece[] {
		return this._whitePawns;
	}
	public get blackPawns(): Piece[] {
		return this._blackPawns;
	}
	public set allMoves(v: string[]) {
		this._allMoves = v;
	}
	public get chessBoard(): string[][] {
		return this._chessBoard;
	}
	public get allPieces(): Piece[] {
		return this._allPieces;
	}
	public get whitePieces(): Piece[] {
		return this._whitePieces;
	}
	public get blackPieces(): Piece[] {
		return this._blackPieces;
	}

	getWhiteRoc() {}
	getBlackRoc() {}
	inCheck() {}
	inCheckMate() {}


	/**
	 *
	 * @returns
	 */
	public otherPositions(): string[] {
		let pieces: string[] = [];
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
