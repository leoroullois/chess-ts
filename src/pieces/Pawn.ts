import { newGame } from "../app.js";
import { Piece } from "../Piece.js";
export class Pawn extends Piece {
	private _count: number;
	private _promoted: boolean;
	private _enPassant: boolean;
	public constructor(color: string, currPos: string, name: string) {
		super(color, currPos, name);
		this._count = 0;
		this._promoted = false;
		this._enPassant = false;
	}
	// Getters and setters
	public get count() {
		return this._count;
	}

	public get promoted(): boolean {
		return this._promoted;
	}
	public get enPassant(): boolean {
		return this._enPassant;
	}

	public onClick(e: JQuery.ClickEvent): void {
		console.log(e);
		console.log(newGame.allPieces);
	}
	public move(): void {}
}
