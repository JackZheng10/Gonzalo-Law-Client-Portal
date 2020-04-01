const path = require("path"),
  express = require("express"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  routes = require("../routes");

morgan = require("morgan");

//require("dotenv").config();

module.exports.init = () => {
  mongoose.connect(process.env.DB_URI || require("./config.js").db.uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const app = express();

  app.use(cors());

  // morgan used for logging HTTP requests to the console
  app.use(morgan("dev"));

  // bodyParser used for resolving the req and res body objects (urlEncoded and json formats)
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connected");
  });
  connection.on("error", e => console.log("error"));

  app.use("/api", routes);

  if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "../../client/build")));

    // Handle React routing, return all requests to React app
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
    });
  }

  return app;
};
