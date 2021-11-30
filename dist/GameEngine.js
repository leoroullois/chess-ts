export class GameEngine {
    constructor(fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1") {
        let splitedFen = fen.split(" ");
        this._position = splitedFen[0];
        this._color = splitedFen[1];
        this._roc = splitedFen[2];
        this._enPassant = splitedFen[3];
        this._halfMove = splitedFen[4];
        this._fullMove = splitedFen[5];
        this._fen = fen;
        this._allMoves = [];
    }
    /**
     * getFen
     * @returns The actual FEN
     */
    getFen() {
        return this._fen;
    }
    getWhiteRoc() { }
    getBlackRoc() { }
    inCheck() { }
    inCheckMate() { }
}
