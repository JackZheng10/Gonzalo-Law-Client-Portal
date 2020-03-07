const path = require("path"),
  express = require("express"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  routes = require("../routes");

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
  app.use(express.json());

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connected");
  });
  connection.on("error", e => console.log("error"));

  app.use("/", routes);

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
