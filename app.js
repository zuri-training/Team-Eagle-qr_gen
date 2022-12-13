var express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose =
		require("passport-local-mongoose"),
	User = require("./models/user");

var path = require('path');
mongoose.connect('mongodb://localhost/27019');

var app = express();
app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, '/public')));
app.set('views', './views');
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require("express-session")({
	secret: "Rusty is a dog",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=====================
// ROUTES
//=====================

// Showing home page
app.get("/", function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
	//res.redirect("/index");
});

// Showing secret page
app.get("/secret", isLoggedIn, function (req, res) {
	res.sendFile(__dirname + '/views/secret.html');
	//res.redirect("/secret");
});
// show the catalog page
app.get("/catalog", function (req, res) {
	res.sendFile(__dirname + '/views/catalog.html');
	//res.redirect("/catalog");
});
app.post("/catalog", function (req, res) {
	res.sendFile(__dirname + '/views/catalog.html');
	//res.redirect("/catalog");
});

// Showing register form
app.get("/register", function (req, res) {
	res.sendFile(__dirname + '/views/createaccount.html');
	//res.redirect("/createaccount");
});

// Handling user signup
app.post("/register", function (req, res) {
	var username = req.body.username
	var password = req.body.password
	User.register(new User({ username: username, password: password }),
			password, function (err, user) {
		if (err) {
			//console.log(err);
            alert(err);
			return res.sendFile(__dirname + '/views/createaccount.html');
			//return res.redirect("/createaccount");
		}

		passport.authenticate("local")(
			req, res, function () {
			res.sendFile(__dirname + '/views/secret.html');
			//res.redirect("/secret");
		});
	});
});

//Showing login form
app.get("/login", function (req, res) {
	res.sendFile(__dirname + '/views/login.html');
	//res.render("login");
});

//Handling user login
app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}), function (req, res) {
});

//Handling user logout
app.get("/logout", function (req, res) {
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/login");
}

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Server Has Started!");
});
