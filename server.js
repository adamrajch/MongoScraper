var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require('express-handlebars');
var axios = require("axios");
var cheerio = require("cheerio");
var path = require("path")
// Require all models
var db = require("./app/models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
mongoose.connect("mongodb://localhost/mongoscraper", { useNewUrlParser: true });

app.engine('handlebars', exphbs({ defaultLayout: "main" }));
// app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'handlebars');


require("./app/public/routes/api-routes")(app);

require("./app/public/routes/html-routes")(app);

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});