const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Route = require("./routes/route");
const connectDB = require("./db/dbconnect");
const cors = require("cors");
const session = require("express-session");
const fs = require("fs");

require("dotenv").config();

var sess;

//middleware
app.use(cors());
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	session({
		secret: "bakarepraise3",
		saveUninitialized: true,
		resave: false,
	})
);

app.get("/", (req, res) => {
    res.render("index", {title: "SmartQR"});
});

app.use("/api/qrcode", Route);

//Pages
app.get("/user/login", (req, res) => {
	fs.readFile("./public/index.html", function (err, data) {
		res.writeHead(200, { "Content-Type": "text/html" });
		res.write(data);
		return res.end();
	});
});

app.get("/user/register", (req, res) => {
	fs.readFile("./public/", function (err, data) {
		res.writeHead(200, { "Content-Type": "text/html" });
		res.write(data);
		return res.end();
	});
});

app.get("/home", (req, res) => {
	let sess = req.session;
	if (sess.user) {
		fs.readFile("./public/", function (err, data) {
			res.writeHead(200, { "Content-Type": "text/html" });
			res.write(data);
			return res.end();
		});
	} else {
		res.redirect("/user/login");
	}
});

const start = async () => {
	try {
		await connectDB(process.env.DATABASE);
		console.log("DB connected successfully");
		app.listen(process.env.PORT, console.log(`Server is listening on port ${process.env.PORT}...`));
	} catch (error) {
		console.log(error);
	}
};

start();
