import { newGame } from "./app.js";

export abstract class Piece {
	private _color: string;
	private _currPos: string;
	private _name: string;
	private _ball: string;
	public constructor(color: string, currPos: string, name: string) {
		this._color = color;
		this._currPos = currPos;
		this._name = name;
		this._ball = '<div class="ball"></div>';
		this.move = this.move.bind(this);
	}
	// ? Getters et setters
	public get color(): string {
		return this._color;
	}
	public set currPos(pPos: string) {
		this._currPos = pPos;
	}
	public get currPos(): string {
		return this._currPos;
	}
	public get name(): string {
		return this._name;
	}
	
	public get ball() : string {
		return this._ball;
	}
	
	/**
	 * * Récupère la case de la pièce.
	 * @returns la case (élément HTML) où se trouve la pièce
	 */
	public getHTML(): string | undefined {
		if (this._currPos === "0") {
			return undefined;
		} else {
			return $(this._currPos).html();
		}
	}
	/**
	 * ? Permet de connaîte "l'identité" d'un mouvement.
	 * @param pMove Pièce a laquelle on souhaite bouger
	 * @returns Un string du genre "BxA3"
	 */
	public getMoveString(pMove: string): string {
		// TODO: si la pièce est occupée par une pièce
		return this._name + pMove;
	}
	/**
	 * ! Fonctiton très importante
	 * ? Gère les clicks sur les pièces.
	 * @param e Evenement du click sur une pièce.
	 */
	public abstract onClick(e: JQuery.ClickEvent): void;
	/**
	 * ! Fonction très importante
	 * ? Une fois que onClick est déclenchée et que le joueur à décider de jouer un coup, move permet de gérer le mouvement de la pièce.
	 */
	public abstract move(e:JQuery.ClickEvent): void;
	public abstract getAllowedPos():JQuery[][]; 
	public getID(id: string): string {
		return `#${id}`;
	}
	public delID(id: string): string {
		return id.slice(1, 3);
	}
	/**
	 * ? "#A1" => [0,0]
	 * @param caseString "#A1"
	 * @returns [0,0]
	 */
	public strToArr(caseString: string): number[] {
		let caseCoords = this.delID(caseString).split("");
		let x = caseCoords[0].charCodeAt(0) - 65;
		let y = Number(caseCoords[1]) - 1;
		return [x, y];
	}
	/**
	 * ? [0,0] => "#A1"
	 * @param coords [0,0]
	 * @returns "#A1"
	 */
	public arrToStr(coords: number[]): string {
		let i = String.fromCharCode(coords[0] + 65);
		let j = (coords[1] + 1).toString();
		return "#" + i + j;
	}
	/**
	 * ? Affiche des boules sur les cases du tableau
	 * @param cases tableau d'éléments jQuery
	 */
	public displayBalls(cases: JQuery<HTMLElement>[]):void {
		cases?.forEach((elt: JQuery) => {
			elt?.html(this._ball);
		});
	}

	/**
	 * ? Permet de récupérer la pièce d'une case.
	 * @param id "#A1"
	 * @returns la pièce se trouvant à l'id ou null
	 */
	public displayPiece(id: string): Piece | null {
		let myPiece = null;
		if (id == undefined) {
			return myPiece;
		}
		newGame.allPieces.forEach((elt: Piece) => {
			if (elt.currPos == id) {
				myPiece = elt;
			}
		});
		return myPiece;
	}
	/**
	 * ? changePosition("#A1",2,5) => "#C6"
	 * @param actualPos position actuelle (sous forme d'ID)
	 * @param i Nombre de lignes vers la droite
	 * @param j Nombre de colonnes vers le bas
	 * @returns nouvelle position (sous forme d'id)
	 */
	public changePos(
		actualPos: string,
		i: number = 0,
		j: number = 0
	): string | undefined {
		let coords = this.strToArr(actualPos);
		//Afin de s'assurer que la pièce ne sorte pas de l'échiquier
		if (0 <= coords[0] + i && coords[0] + i < 8) {
			coords[0] += i;
		} else {
			// Si la nouvelle position est en dehors de l'échiquier renvoyer undefined
			return undefined;
		}
		//Afin de s'assurer que la pièce ne sorte pas de l'échiquier
		if (0 <= coords[1] - j && coords[1] - j < 8) {
			coords[1] -= j;
		} else {
			// Si la nouvelle position est en dehors de l'échiquier renvoyer undefined
			return undefined;
		}
		return this.arrToStr(coords);
	}

	public removeBalls(): void {
		for (let i = 0; i < newGame.chessBoard.length; i++) {
			for (let j = 0; j < newGame.chessBoard[i].length; j++) {
				const myCase = $(this.getID(newGame.chessBoard[i][j]));
				if (myCase.html() == this.ball) {
					myCase.html("");
				}
				myCase.off();
			}
		}
		this.addEvents(this.color);
	}
	public getEmptyCases() : JQuery<HTMLElement>[] {
		let emptyCases : JQuery<HTMLElement>[] = [];
		for (let i=0; i<newGame.chessBoard.length; i++) {
			for (let j=0; j<newGame.chessBoard[i].length; j++) {
				const piece = $(this.getID(newGame.chessBoard[i][j]));
				if(piece?.html()=="") {
					emptyCases.push(piece);
				}
			}
		}
		return emptyCases;
	}
	public addEvents(color: string): void {
		if (color === "b") {
			console.log("ADD EVENTS: black");
			newGame.blackPieces.forEach((piece) => {
				if (piece.currPos != "0") {
					$(piece.currPos).on(
						"click",
						piece.onClick.bind(piece)
					);
				}
			})
		} else {
			console.log("ADD EVENTS: white");
			newGame.whitePieces.forEach((piece) => {
				if (piece.currPos != "0") {
					$(piece.currPos).on(
						"click",
						piece.onClick.bind(piece)
					);
				}
			})
		}
	}
	/**
	 * ? Supprime les événements des pièces de la couleur en argument
	 * @param color "b" ou "w"
	 */
	public removeEvents(color: string): void {
		if (color == "b") {
			console.log("REMOVE EVENT: black");
			newGame.blackPieces.forEach((piece) => {
				$(piece.currPos).off();
			})
		} else {
			console.log("REMOVE EVENT: white");
			newGame.whitePieces.forEach((piece) => {
				$(piece.currPos).off();
			})
		}
	}
	public clearEvents() {
		console.log("CLEAR EVENT.");
		for (let i = 0; i < newGame.chessBoard.length; i++) {
			for (let j = 0; j < newGame.chessBoard[i].length; j++) {
				$("#"+newGame.chessBoard[i][j]).off();
			}
		}
	}
}
