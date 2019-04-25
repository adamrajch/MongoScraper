var db = require("../../models")
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {

    app.get("/wsjscrape", function (req, res) {
        axios.get("https://www.wsj.com/news/world").then(function (response) {

            var $ = cheerio.load(response.data);

            $("ol li").each(function (i, element) {


                var newArticle = {};
                newArticle.title = $(this).children("a").text();
                newArticle.link = $(this).children("a").attr("href");


                let regex = /video/;
                //ommit this particlur li item b/c its according to another list of videos
                if (regex.test(newArticle.link)) {
                    console.log("contains vid")
                }
                else {
                    console.log(newArticle);
                    db.Article.create(newArticle)
                        .then(function (dbArticle) {
                            console.log(dbArticle);
                        })
                        .catch(function (err) {

                            console.log(err);
                        });

                }

            });
            res.send("Scrape Complete");
        });
    });

    // app.get("/yeet", function (req, res) {
    //     db.Article.find({}, function (err, data) {
    //         if (err) throw err;
    //         res.render("wsj", data);
    //     })
    // })
    app.get("/nytscrape", function (req, res) {

    })





}