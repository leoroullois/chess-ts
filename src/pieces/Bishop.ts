import { Piece } from "../Piece.js";
import { newGame } from "../app.js";
export class Bishop extends Piece {
	public constructor(color: string, currPos: string, name: string) {
		super(color, currPos, name);
	}
	public onClick(e: JQuery.ClickEvent): void {
		console.log(e);
		const allPos : JQuery<HTMLElement>[][] = this.getAllowedPos();
		console.log(allPos);
	}
	public move(): void {}
	public getAllowedPos(): JQuery<HTMLElement>[][] {
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
		let positions: JQuery<HTMLElement>[][] = [];
		let diags = [diag1, diag2, diag3, diag4];
		diags.forEach((diag: string[]) => {
			let k: number = 0;
			let diagBis = [];
			do {
				k++;
				if (this.displayPiece(diag[k]) != undefined) {
					if (this.displayPiece(diag[k])?.color != color) {
						diagBis.push($(diag[k]));
					}
				} else {
					diagBis.push($(diag[k]));
				}
			} while (k < diag.length && this.displayPiece(diag[k]) == undefined);
			positions.push(diagBis);
		});

		return positions;
	}
}
