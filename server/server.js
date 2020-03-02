const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
let routes = require("./routes");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URI || require("./config/config.js").db.uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connected");
});
connection.on("error", e => console.log("error"));

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../../client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
  });
}

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
