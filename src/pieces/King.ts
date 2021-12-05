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
			const cond1 = elt[0] >= 0 && 7 >= elt[0];
			const cond2 = elt[1] >= 0 && 7 >= elt[1];
			return cond1 && cond2;
		});
		let positions2: string[] = positions.map((elt) => this.arrToStr(elt));
		positions2 = positions2.filter((elt) => {
			const piece = this.displayPiece(elt);
			return piece?.color != color;
		});
		let positions3: JQuery<HTMLElement>[] = positions2.map((elt) => $(elt));
		return [positions3];
	}
}
