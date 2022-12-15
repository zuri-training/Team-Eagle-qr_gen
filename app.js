const express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	User = require("./models/user");
const connectDB = require("./db/dbconnect");
require("dotenv").config();
var app = express();
app.use(express.static("public"));

// var path = require("path");
// const qr = require("qrcode");
//app.use(express.static(path.join(__dirname, '/public')));
// app.set("views", "./views");
// app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	require("express-session")({
		secret: "Rusty is a dog",
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// const QRCode = require("qrcode");

// var opts = {
// 	errorCorrectionLevel: "H",
// 	type: "image/jpeg",
// 	quality: 0.9,
// 	margin: 1,
// 	width: 250,
// 	color: {
// 		dark: "#000",
// 		light: "#FFF",
// 	},
// };

// const generateQR = async (text) => {
// 	QRCode.toDataURL(text, opts, (err, src) => {
// 		let url = src;
// 		return url;
// 		if (err) {
// 			console.log(err);
// 		}
// 	});
// };

//=====================
// ROUTES
//=====================

// Showing home page
app.get("/", function (req, res) {
	res.sendFile("./views/index.html", { root: __dirname });
});

// Showing register form
app.get("/register", function (req, res) {
	res.sendFile("./views/createaccount.html", { root: __dirname });
});

app.get("/categories", function (req, res) {
	res.sendFile("./views/categories.html", { root: __dirname });
});
app.get("/user/generate-card", function (req, res) {
	res.sendFile("./views/businesscard.html", { root: __dirname });
});
app.get("/user/generate-catalog", function (req, res) {
	res.sendFile("./views/catalog.html", { root: __dirname });
});
app.get("/user/generate-link", function (req, res) {
	res.sendFile("./views/webinfo.html", { root: __dirname });
});

// Handling user signup
app.post("/register", function (req, res) {
	var username = req.body.username;
	var password = req.body.password;
	User.register(new User({ username: username, password: password }), password, function (err, user) {
		if (err) {
			console.log(err);
			return res.sendFile("./views/createaccount.html", { root: __dirname });
		}

		passport.authenticate("local")(req, res, function () {
			res.redirect("/categories");
		});
	});
});

//Showing login form
app.get("/login", function (req, res) {
	res.sendFile("./views/login.html", { root: __dirname });
});

//Handling user login
app.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/categories",
		failureRedirect: "/login",
	}),
	function (req, res) {}
);

//Handling user logout
app.get("/logout", function (req, res) {
	req.logout;
	res.redirect("/");
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/login");
}

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
