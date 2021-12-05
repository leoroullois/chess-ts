import { Piece } from "../Piece.js";
import { newGame } from "../app.js";
export class Queen extends Piece {
	public constructor(color: string, currPos: string, name: string) {
		super(color, currPos, name);
	}
	public onClick(e: JQuery.ClickEvent): void {
		e.stopPropagation();
		console.log(
			"%c DEBUT onClick(e) :",
			"color:green;font-weight: 800; font-size: 1.5em;"
		);
		console.table(this);
		this.clearEvents();
		this.removeBalls();
		$(this.currPos).off();
		// Récup tous les coups possibles [["A1","A2"],["B3"]] avec les endroits vides et les endroits à attaquer
		const allowedPos = this.getAllowedPos();
		// const positions = allowedPos[0].concat(allowedPos[1]);
		console.log(allowedPos);
		// this.displayBalls(allowedPos[0]);

		// positions.forEach((elt) => {
		// 	elt.on("click", this.move);
		// });
		// this.getEmptyCases().forEach((elt) => {
		// 	elt.on("click", () => {
		// 		this.removeBalls();
		// 		this.clearEvents();
		// 		this.addEvents(this.color);
		// 	});
		// });
		console.log(
			"%c FIN ONCLICK.",
			"color:green;font-weight: 800; font-size: 1.5em;"
		);
	}
	public move(): void {}
	public getAllowedPos1(): JQuery<HTMLElement>[][] {
		const currID = this.currPos;
		const color = this.color;
		let i = this.strToArr(currID)[0];
		let j = this.strToArr(currID)[1];
		let diag1 = [];
		let diag2 = [];
		let diag3 = [];
		let diag4 = [];
		for (let k = 1; k < 8; k++) {
			diag1.push([i - k, j + k]);
			diag2.push([i + k, j + k]);
			diag3.push([i + k, j - k]);
			diag4.push([i - k, j - k]);
		}
		diag1 = diag1.filter((elt) => {
			const cond1 = elt[0] >= 0 && 7 >= elt[0];
			const cond2 = elt[1] >= 0 && 7 >= elt[1];
			return cond1 && cond2;
		});
		diag2 = diag2.filter((elt) => {
			const cond1 = elt[0] >= 0 && 7 >= elt[0];
			const cond2 = elt[1] >= 0 && 7 >= elt[1];
			return cond1 && cond2;
		});
		diag3 = diag3.filter((elt) => {
			const cond1 = elt[0] >= 0 && 7 >= elt[0];
			const cond2 = elt[1] >= 0 && 7 >= elt[1];
			return cond1 && cond2;
		});
		diag4 = diag4.filter((elt) => {
			const cond1 = elt[0] >= 0 && 7 >= elt[0];
			const cond2 = elt[1] >= 0 && 7 >= elt[1];
			return cond1 && cond2;
		});
		diag1 = diag1.map((elt) => this.arrToStr(elt));
		diag2 = diag2.map((elt) => this.arrToStr(elt));
		diag3 = diag3.map((elt) => this.arrToStr(elt));
		diag4 = diag4.map((elt) => this.arrToStr(elt));
		let diags = [diag1, diag2, diag3, diag4];
		let positions: JQuery<HTMLElement>[][] = [];
		diags.forEach((diag) => {
			let diagBis = [];
			let k = 0;
			while (k < diag.length && this.displayPiece(diag[k]) == null) {
				if (this.displayPiece(diag[k]) != null) {
					if (this.displayPiece(diag[k])?.color != color) {
						diagBis.push($(diag[k]));
					}
				} else {
					diagBis.push($(diag[k]));
				}
				k++;
			}
			positions.push(diagBis);
		});
		return positions;
	}
	public getAllowedPos2(): JQuery<HTMLElement>[][] {
		const currID = this.currPos;
		const color = this.color;
		let i = this.strToArr(currID)[0];
		let j = this.strToArr(currID)[1];
		let row1 = [];
		let row2 = [];
		let row3 = [];
		let row4 = [];
		for (let k = 1; k < 8; k++) {
			row1.push([i, j + k]);
			row2.push([i, j - k]);
			row3.push([i + k, j]);
			row4.push([i - k, j]);
		}
		row1 = row1.filter((elt) => {
			const cond1 = elt[0] >= 0 && 7 >= elt[0];
			const cond2 = elt[1] >= 0 && 7 >= elt[1];
			return cond1 && cond2;
		});
		row2 = row2.filter((elt) => {
			const cond1 = elt[0] >= 0 && 7 >= elt[0];
			const cond2 = elt[1] >= 0 && 7 >= elt[1];
			return cond1 && cond2;
		});
		row3 = row3.filter((elt) => {
			const cond1 = elt[0] >= 0 && 7 >= elt[0];
			const cond2 = elt[1] >= 0 && 7 >= elt[1];
			return cond1 && cond2;
		});
		row4 = row4.filter((elt) => {
			const cond1 = elt[0] >= 0 && 7 >= elt[0];
			const cond2 = elt[1] >= 0 && 7 >= elt[1];
			return cond1 && cond2;
		});
		row1 = row1.map((elt) => this.arrToStr(elt));
		row2 = row2.map((elt) => this.arrToStr(elt));
		row3 = row3.map((elt) => this.arrToStr(elt));
		row4 = row4.map((elt) => this.arrToStr(elt));
		let positions: JQuery<HTMLElement>[][] = [];
		const rows = [row1, row2, row3, row4];
		console.log("rows :",rows);
		rows.forEach((row) => {
			let rowBis = [];
			let k = 0;
			while (k < row.length && this.displayPiece(row[k]) == null) {
				if (this.displayPiece(row[k]) != null) {
					if (this.displayPiece(row[k])?.color != color) {
						rowBis.push($(row[k]));
					}
				} else {
					rowBis.push($(row[k]));
				}
				k++;
			}
			positions.push(rowBis);
		});
		console.log("positions :", positions);
		return positions;
	}
	public getAllowedPos(): JQuery<HTMLElement>[][] {
		const pos1 = this.getAllowedPos1();
		const pos2 = this.getAllowedPos2();
		let positions = pos1.concat(pos2);
		return positions;
	}
}
