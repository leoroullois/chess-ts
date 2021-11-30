const express = require("express");

const PORT = 3000;

// Initialize Express
const app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public static folder
app.use(express.static("public"));

// Start the server
app.listen(PORT, function () {
	console.log("Listening on port " + PORT + ".");
});

/*
// ? Routes
app.get("/", function (req, res) {
	res.send("Hello from demo app!");
});

app.get("/products", function (req, res) {
	Product.find({})
		.then(function (dbProducts) {
			res.json(dbProducts);
		})
		.catch(function (err) {
			res.json(err);
		});
});

app.post("/product", function (req, res) {
	Product.create(req.body)
		.then(function (dbProduct) {
			// If we were able to successfully create a Product, send it back to the client
			res.json(dbProduct);
		})
		.catch(function (err) {
			// If an error occurred, send it to the client
			res.json(err);
		});
});
*/