import { Piece } from "../Piece.js";
import { newGame } from "../app.js";
export class Rook extends Piece {
	private _count: number;
	public constructor(color: string, currPos: string, name: string) {
		super(color, currPos, name);
		this._count = 0;
	}
    
    public get count() : number {
        return this._count;
    }
    
	public onClick(e: JQuery.ClickEvent): void {
		console.log(e);
	}
	public move(): void {}
}
