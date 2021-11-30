import { Piece } from "../Piece.js";
export class Bishop extends Piece {
	public constructor(color: string, currPos: string, name: string) {
		super(color, currPos, name);
    }
	public onClick(e: JQuery.ClickEvent): void {
		console.log(e);
	}
	public move(): void {}
}
