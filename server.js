// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

// Require axios and cheerio for scraping 
const axios = require("axios");
const cheerio = require("cheerio");

// Require index in the models folder
const db = require("./models");
// Initialize Express
const app = express();
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Hook mongojs configuration to the db variable

mongoose.connect('mongodb://localhost:27017/Article', {useNewUrlParser: true});


// Route to retrieve data from mongo and display it
app.get("/all", function (req, res) {
  // Query the mongodb for my scraped data and return it as json object
  db.Article.find({}, function (error, articles) {
    // Log any errors 
    if (error) {
      console.log(error);
    }
    // Send the result to the browser
    else {
      res.json(articles);
    }
  });
});

// Route 2
// =======
// When you visit this route, the server will scrape data from the site and save to mongo
app.get("/scrape", function (req, res) {
  // First remove the data from the database so it is not duplicated
  db.Article.remove({});
  // Make an axios call to the website
  axios.get("https://www.desiringgod.org").then(function (res) {
    let $ = cheerio.load(res.data);

    // Loop through each article parent element for the title and link
    $("a.card__shadow").each(function (i, element) {
      let title = $(element).find("h2").text();
      let link = "www.desiringgod.org";
      link += $(element).find("a").attr("href");
      
      // Insert the new elements into the scraperDB
      db.Article.create({
        title: title,
        link: link
      });
    });
  }).then(function(){
    // Checking for functionality
    res.send("hey");
  });
});

// Listen on port 3000
app.listen(3000, function () {
  console.log(`App running on port 3000!`);
});