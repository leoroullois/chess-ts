import { Piece } from "../Piece.js";
import { newGame } from "../app.js";
export class Rook extends Piece {
	private _count: number;
	public constructor(color: string, currPos: string, name: string) {
		super(color, currPos, name);
		this._count = 0;
	}

	public get count(): number {
		return this._count;
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
		const allowedPos: JQuery<HTMLElement>[][] = this.getAllowedPos();
		const positions: JQuery<HTMLElement>[] = allowedPos.flat();

		let dataset = positions.filter((elt) => {
			const id = "#" + elt.attr("id");
			if (id) {
				return this.displayPiece(id) == null;
			}
			return false;
		});
		this.displayBalls(dataset);
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
		console.log(
			"%c FIN ONCLICK.",
			"color:green;font-weight: 800; font-size: 1.5em;"
		);
	}
	public move(e: JQuery.ClickEvent): void {
		e.stopPropagation();
		this.removeBalls();
		if (this.displayPiece("#" + e.currentTarget.id)) {
			// ? S'il y a une pièce sur la case destination :
			$("#" + e.currentTarget.id).html("");
			const attackedPiece = this.displayPiece("#" + e.currentTarget.id);
			if (attackedPiece) {
				attackedPiece.currPos = "0";
			}
			$(this.currPos).children().appendTo(this.getID(e.currentTarget.id));
		} else {
			// ? Si la case de destination est vide
			$(this.currPos).children().appendTo(this.getID(e.currentTarget.id));
		}
		this.currPos = this.getID(e.currentTarget.id);

		if (this.color === "b") {
			newGame.color = "w";
		} else {
			newGame.color = "b";
		}
		this.clearEvents();
		this.addEvents(this.color === "b" ? "w" : "b");
	}

	public getAllowedPos(): JQuery<HTMLElement>[][] {
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
		rows.forEach((row) => {
			let rowBis = [];
			let k = 0;
			do {
				if (this.displayPiece(row[k]) != null) {
					if (this.displayPiece(row[k])?.color != color) {
						rowBis.push($(row[k]));
					}
				} else {
					rowBis.push($(row[k]));
				}
				k++;
			} while (k < row.length && this.displayPiece(row[k - 1]) == null);
			positions.push(rowBis);
		});
		return positions;
	}
}
