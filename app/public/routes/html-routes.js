// var path = require("path");
var db = require("../../models")
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('home');
    });
    app.get('/wsj', function (req, res) {
        db.Article.find()
            .then(function (dbArt) {
                res.render('wsj', { articles: dbArt })
            })
    })
    app.get('/nyt', function (req, res) {
        res.render('nyt');
    })
};
