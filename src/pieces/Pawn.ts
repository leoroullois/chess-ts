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
	
	public set count(v : number) {
		this._count = v;
	}
	

	public get promoted(): boolean {
		return this._promoted;
	}
	public get getEnPassant(): boolean {
		return this._enPassant;
	}
	public enPassant() {}
	public onClick(e: JQuery.ClickEvent): void {
		e.stopPropagation();
		console.log(
			"Début onClick(e) : ",
			this.displayPiece("#" + e.currentTarget.id)
		);
		newGame.clearEvents();
		this.removeBalls();
		newGame.addEvents(this.color);
		$(this.currPos).off();
		// Récup tous les coups possibles [["A1","A2"],["B3"]] avec les endroits vides et les endroits à attaquer
		const allowedPos = this.getAllowedPos();
		const positions = allowedPos[0].concat(allowedPos[1]);

		this.displayBalls(allowedPos[0]);
		positions.forEach((elt) => {
			elt.on("click", this.move);
		});
		this.getEmptyCases().forEach((elt) => {
			elt.on("click", () => {
				this.removeBalls();
				newGame.clearEvents();
				newGame.addEvents(this.color);
			});
		});
	}
	public move(e: JQuery.ClickEvent): void {
		e.stopPropagation();
		console.log(e.currentTarget.id)
		this.removeBalls();
		$(this.currPos).children().appendTo(this.getID(e.currentTarget.id));
		this.currPos = this.getID(e.currentTarget.id);
		this.count++;
		if(this.color==="b") {
			newGame.color="w";
		} else {
			newGame.color="b";
		}
		newGame.clearEvents();
		newGame.addEvents((this.color==="b") ? "w" : "b");
	}
	/**
	 * ? Parité : 1 si noir, -1 si blanc
	 * @returns -1 ou 1
	 */
	public parite(): number | undefined {
		let s: number | undefined;
		if (this.color === "b" && this.delID(this.currPos) != "0") {
			s = 1;
		} else if (this.color == "w" && this.delID(this.currPos) != "0") {
			s = -1;
		} else {
			s = undefined;
		}
		return s;
	}

	public getAllowedPos(): JQuery<HTMLElement>[][] {
		const color: string | undefined = this.color;
		const index = this.count;
		const currID = this.currPos;
		const s = this.parite();

		let positions: JQuery<HTMLElement>[][] = new Array();
		let upPos,
			upUpPos,
			firstAttack,
			secondAttack: JQuery<HTMLElement> | undefined;
		if (s) {
			const upID = this.changePos(currID, 0, s * 1);
			if (upID) {
				upPos = $(upID);
			}
			const upUpID = this.changePos(currID, 0, s * 2);
			if (upUpID) {
				upUpPos = $(upUpID);
			}
			// * Attaques
			let attackID = this.changePos(currID, 1, s * 1);
			firstAttack = attackID ? $(attackID) : undefined;
			attackID = this.changePos(currID, -1, s * 1);
			secondAttack = attackID ? $(attackID) : undefined;
		}
		// Si la case upPos est livre :
		if (upPos?.html() == "") {
			positions.push([upPos]);
			if (upUpPos?.html() == "" && index == 0) {
				positions[0].push(upUpPos);
			}
		} else {
			positions.push([]);
		}
		// Si la pièce a manger est de la couleur opposée ET non vide :
		const x = firstAttack?.children()?.attr("alt");
		const y = secondAttack?.children()?.attr("alt");
		if (
			firstAttack != undefined &&
			firstAttack.html() != "" &&
			firstAttack.html() != this.ball &&
			x &&
			x[0] != color
		) {
			positions.push([firstAttack]);
			if (
				secondAttack != undefined &&
				secondAttack.html() != "" &&
				secondAttack.html() != this.ball &&
				y &&
				y[0] != color
			) {
				positions[1].push(secondAttack);
			}
		} else if (
			secondAttack != undefined &&
			secondAttack.html() != "" &&
			secondAttack.html() != this.ball &&
			y &&
			y[0] != color &&
			positions.length == 1
		) {
			positions.push([secondAttack]);
		} else {
			positions.push([]);
		}
		return positions;
	}
}
