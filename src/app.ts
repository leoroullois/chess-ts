import { ChessBoard } from "./ChessBoard.js";
/*
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// ?Connect to MongoDB
const MONGO_URI =
	"mongodb+srv://leyo:mZLYQnaFdUA4AbkI@leyo.psx0o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(MONGO_URI, { useNewUrlParser: true });


// ? Using Schema constructor, create a ProductSchema
const ProductSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	departments: {
		type: Array,
		required: true,
	},
});

// ? Create model from the schema
const Product = mongoose.model("Product", ProductSchema);
*/

const newGameFen: string =
	"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
console.log(newGameFen);

export const newGame: ChessBoard = new ChessBoard();
console.log(newGame.allPieces);
const myBtn :JQuery<HTMLElement> = $("#rotate-board");
const board :JQuery<HTMLElement> = $("#chess-board")
myBtn.on("click",()=> {
	board.toggleClass("active");
	newGame.allPieces.forEach((elt) => {
		$(elt.currPos).toggleClass("active");
	})

})