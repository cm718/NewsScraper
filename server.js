// Dependencies
const express = require("express");
const mongojs = require("mongojs");
// Require axios and cheerio for scraping 
const axios = require("axios");
const cheerio = require("cheerio");
// Initialize Express
const app = express();
app.use(express.static("public"));
// Database configuration
const databaseUrl = "scraper";
const collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
const db = mongojs(databaseUrl, collections);

db.on("error", function (error) {
  console.log("Database Error:", error);
});

// Route to retrieve data from mongo and display it
app.get("/", function (req, res) {
  // Query the mongodb for my scraped data and return it as json object
  db.scrapedData.find({}, function (error, articles) {
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
  db.scrapedData.remove({});
  // Make an axios call to the website
  axios.get("https://www.desiringgod.org").then(function (res) {
    let $ = cheerio.load(res.data);
    let results = [];
    // Loop through each article parent element for the title and link
    $("a.card__shadow").each(function (i, element) {
      let title = $(element).find("h2").text();
      let link = "www.desiringgod.org";
      link += $(element).find("a").attr("href");
      
      // Insert the new elements into the scraperDB
      db.scrapedData.insert({
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