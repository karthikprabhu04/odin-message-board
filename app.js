const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
require('./db/populatedb.js')

// Setup EJS
const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
const {homeRouter} = require("./routes/index");
const newRouter = require("./routes/new");

app.use("/", homeRouter);
app.use("/new", newRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});