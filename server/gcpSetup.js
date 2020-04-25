const path = require("path");
const fs = require("fs");

//heroku deployment
const KEYFILE_PATH = path.join(__dirname, "/controllers/keyFile.json");
fs.writeFile(KEYFILE_PATH, process.env.GCS_KEYFILE, (err) => {
  if (err) {
    console.log(
      "There was an error with generating a key file on Heroku: " + err
    );
  } else {
    console.log("Key file generated successfully.");
  }
});
