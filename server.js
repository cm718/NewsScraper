// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const app = express();

// Set up middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Hook mongoose database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Article', {useNewUrlParser: true});

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Listen on port 3000
app.listen(PORT, function () {
  console.log(`App running on port ${PORT}`);
});