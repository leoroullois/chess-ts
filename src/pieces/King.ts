import { Piece } from "../Piece.js";
import { newGame } from "../app.js";
export class King extends Piece {
	private _count: number;
	public constructor(color: string, currPos: string, name: string) {
		super(color, currPos, name);
		this._count = 0;
	}

	get count(): number {
		return this._count;
	}

	public onClick(e: JQuery.ClickEvent): void {
		console.log(e);
	}
	public move(): void {}
	public getAllowedPos(): JQuery<HTMLElement>[][] {
		const currID = this.currPos;
		const color = this.color;
		let i = this.strToArr(currID)[0];
		let j = this.strToArr(currID)[1];
		let positions: number[][] = [];
		positions.push([i + 1, j]);
		positions.push([i - 1, j]);
		positions.push([i, j - 1]);
		positions.push([i, j + 1]);
		positions.push([i + 1, j + 1]);
		positions.push([i + 1, j - 1]);
		positions.push([i - 1, j + 1]);
		positions.push([i - 1, j - 1]);

		positions = positions.filter((elt) => {
			return this.arrToStr(elt) != undefined;
		});
		let positions2: string[] = positions.map((elt) => this.arrToStr(elt));
		positions2 = positions2.filter((elt) => {
			const piece = this.displayPiece(elt);
			return piece?.color!=color;
		});
		let positions3: JQuery<HTMLElement>[] = positions2.map((elt) => $(elt));
		return [positions3];
	}
}
