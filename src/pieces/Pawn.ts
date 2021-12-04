import { Queen } from "./Queen.js";
import { newGame } from "../app.js";
import { Piece } from "../Piece.js";
type PassantType = {
	p1: JQuery<HTMLElement> | null;
	p2: JQuery<HTMLElement> | null;
	passant: boolean;
};
export class Pawn extends Piece {
	private _count: number;
	private _promoted: boolean;
	private _enPassant: PassantType;
	public constructor(color: string, currPos: string, name: string) {
		super(color, currPos, name);
		this._count = 0;
		this._promoted = false;
		this._enPassant = { p1: null, p2: null, passant: false };
	}
	// Getters and setters
	public get count() {
		return this._count;
	}

	public set count(v: number) {
		this._count = v;
	}

	public get promoted(): boolean {
		return this._promoted;
	}
	public get enPassant(): PassantType {
		return this._enPassant;
	}

	public set enPassant(v: PassantType) {
		this._enPassant = v;
	}

	public getEnPassant(): PassantType {
		console.log("GetEnPassant() :");
		let s = this.parite();
		const id1: string | undefined = this.changePos(this.currPos, s, 0);
		let piece1: Pawn | null = null;
		if (id1) {
			piece1 = <Pawn>this.displayPiece(id1);
		}
		const id2: string | undefined = this.changePos(this.currPos, -s, 0);
		let piece2: Pawn | null = null;
		if (id2) {
			piece2 = <Pawn>this.displayPiece(id2);
		}
		// ? Si la pièce est un pion de couleur opposée, a été déplacée qu'une fois, de deux cases, au dernier coup
		const whiteCondition = this.currPos[2] === "5" && this.color === "w";
		const blackCondition = this.currPos[2] === "4" && this.color === "b";
		if (whiteCondition || blackCondition) {
			if (
				piece1 &&
				piece1.name === "Pawn" &&
				this.color != piece1.color &&
				piece1.enPassant.passant === true
			) {
				const id = this.changePos(this.currPos, s, s);
				if (id && $(id).html() == "") {
					return { p1: $(id), p2: null, passant: false };
				} else {
					return { p1: null, p2: null, passant: false };
				}
			} else if (
				piece2 &&
				piece2.name === "Pawn" &&
				this.color != piece2.color &&
				piece2.enPassant.passant === true
			) {
				const id = this.changePos(this.currPos, -s, s);
				if (id && $(id).html() == "") {
					return { p1: null, p2: $(id), passant: false };
				} else {
					return { p1: null, p2: null, passant: false };
				}
			}
		}
		return { p1: null, p2: null, passant: false };
	}
	public onClick(e: JQuery.ClickEvent): void {
		e.stopPropagation();
		// console.log(
		// 	"Début onClick(e) : ",
		// 	this.displayPiece("#" + e.currentTarget.id)
		// );
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
		const positions = allowedPos[0].concat(allowedPos[1]);

		this.displayBalls(allowedPos[0]);
		this.enPassant = this.getEnPassant();
		console.log("En Passant 1 :");
		console.table(this.enPassant);
		const s = this.parite();
		if (this.enPassant.p1) {
			if (s) {
				const newPos = this.changePos(this.currPos, s, s);
				if (newPos) {
					this.enPassant.p1 = $(newPos);
				}
			}
		}
		if (this.enPassant.p2) {
			if (s) {
				const newPos = this.changePos(this.currPos, -s, s);
				if (newPos) {
					this.enPassant.p2 = $(newPos);
				}
			}
		}
		if (this.enPassant.p1 != null) {
			this.enPassant.p1.html(this.ball);
			this.enPassant.p1.on("click", this.move);
		}
		if (this.enPassant.p2 != null) {
			this.enPassant.p2.html(this.ball);
			this.enPassant.p2.on("click", this.move);
		}
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
		console.log("FIN ONCLICK.");
	}
	public move(e: JQuery.ClickEvent): void {
		console.log(
			"%c DEBUT MOVE() :",
			"color:purple;font-weight: 800; font-size: 1.5em;"
		);
		console.log("DEBUT MOVE() :");
		e.stopPropagation();
		this.removeBalls();
		const s = this.parite();
		// ? Prise en passant
		// TODO: Tous les updates pour la prise en passant
		if (this.enPassant.p1) {
			console.log("En passant P1 :");
			const attackedPos = this.changePos(this.currPos, s, 0);
			if (attackedPos) {
				$(attackedPos).html("");
				const attackedPiece = this.displayPiece(attackedPos);
				if (attackedPiece) {
					attackedPiece.currPos = "0";
				}
			}
			$(this.currPos)
				.children()
				.appendTo("#" + e.currentTarget.id);
		} else if (this.enPassant.p2) {
			console.log("En passant P2 :");
			if (s) {
				const attackedPos = this.changePos(this.currPos, -s, 0);
				if (attackedPos) {
					$(attackedPos).html("");
					const attackedPiece = this.displayPiece(attackedPos);
					if (attackedPiece) {
						attackedPiece.currPos = "0";
					}
				}
				$(this.currPos)
					.children()
					.appendTo("#" + e.currentTarget.id);
			}
		} else if (this.currPos[2] === "7" && this.color === "w") {
			// ? Promotion en dame
			console.log("Promotion dame");
			const queen = new Queen("w", "#" + e.currentTarget.id, "Z");
			// ? Remplace le pion par une dame
			const indexAllPieces: number = newGame.allPieces.indexOf(this);
			const indexWhitePieces: number = newGame.whitePieces.indexOf(this);
			if (indexAllPieces != -1) {
				newGame.allPieces[indexAllPieces] = queen;
			}
			if (indexWhitePieces != -1) {
				newGame.whitePieces[indexWhitePieces] = queen;
			}
			// ? "Supprime" le pion
			$(this.currPos).html("");
			$("#" + e.currentTarget.id).html(
				'<img src="//images.chesscomfiles.com/chess-themes/pieces/neo/150/wq.png" alt="white queen">'
			);
			this.currPos = "0";
			this._promoted = true;
			this.count++;
		} else if (this.currPos[2] === "2" && this.color === "b") {
			console.log("Promotion dame");
			const queen = new Queen("b", "#" + e.currentTarget.id, "Z");
			// ? Remplace le pion par une dame.
			const indexAllPieces: number = newGame.allPieces.indexOf(this);
			const indexBlackPieces: number = newGame.blackPieces.indexOf(this);
			console.log(indexAllPieces);
			console.log(indexBlackPieces);
			if (indexAllPieces != -1) {
				newGame.allPieces[indexAllPieces] = queen;
			}
			if (indexBlackPieces != -1) {
				newGame.blackPieces[indexBlackPieces] = queen;
			}
			// ? "Supprime" le pion
			$(this.currPos).html("");
			$("#" + e.currentTarget.id).html(
				'<img src="//images.chesscomfiles.com/chess-themes/pieces/neo/150/bq.png" alt="black queen">'
			);
			this.currPos = "0";
			this._promoted = true;
			this.count++;
		} else if (this.displayPiece("#" + e.currentTarget.id)) {
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
		this.count++;
		if (this.currPos[2] === "4" && this.color === "w" && this.count === 1) {
			this.enPassant = { p1: null, p2: null, passant: true };
		} else if (
			this.currPos[2] === "5" &&
			this.color === "b" &&
			this.count === 1
		) {
			this.enPassant = { p1: null, p2: null, passant: true };
		} else {
			this.enPassant = { p1: null, p2: null, passant: false };
		}
		if (this.color === "b") {
			newGame.color = "w";
		} else {
			newGame.color = "b";
		}
		console.log("En Passant 2 ");
		console.table(this.enPassant);
		this.clearEvents();
		this.addEvents(this.color === "b" ? "w" : "b");
		console.log(
			"%c FIN MOVE();",
			"color:purple;font-weight: 800; font-size: 1.5em;"
		);
	}
	/**
	 * ? Parité : 1 si noir, -1 si blanc
	 * @returns -1 ou 1
	 */
	public parite(): number {
		if (this.color === "b") {
			return 1;
		}
		return -1;
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
