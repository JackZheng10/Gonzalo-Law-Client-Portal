const path = require("path"),
  express = require("express"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  routes = require("../routes");

require("dotenv").config();

module.exports.init = () => {
  if (process.env.DB_URI) {
    mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
  } else {
    mongoose.connect(require("./config").db.uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
  }

  const app = express();

  app.use(cors());
  app.use(express.json());

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connected");
  });
  connection.on("error", e => console.log("error"));

  app.use("/", routes);

  if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "../../client/buildA")));

    // Handle React routing, return all requests to React app
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../../client/buildA", "index.html"));
    });
  }

  return app;
};