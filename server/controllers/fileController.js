const { Storage } = require("@google-cloud/storage");
const jwtDecode = require("jwt-decode");
const path = require("path");

//file storage bucket details, replace as needed
const projectId = "polished-engine-272617";
const bucketName = "gonzl-2";

const keyFilename = "server/keys/keyFile.json";
let storage = null;

//set the key file/credentials used
if (process.env.NODE_ENV === "production") {
  //heroku deployment
  const KEYFILE_PATH = path.join(__dirname, "/keyFile.json");
  fs.writeFile(KEYFILE_PATH, process.env.GCS_KEYFILE, (err) => {
    console.log(
      "There was an error with generating a key file on Heroku: " + err
    );
  });
  storage = new Storage({ projectId, KEYFILE_PATH });
} else {
  //local deployment
  storage = new Storage({ projectId, keyFilename });
}

//create a client
//const storage = new Storage({ projectId, keyFilename });
const bucket = storage.bucket(bucketName);

//Sources: google cloud documentation
const uploadFile = (req, res, next) => {
  const currUser = jwtDecode(req.headers.token);

  if (currUser.isAdmin === true || currUser.email === req.body.email) {
    if (!req.file) {
      console.log(req);
      res.status(400).send("No file uploaded.");
      return;
    }

    //console.log(req.body);
    // Create a new blob in the bucket and upload the file data.

    const blob = bucket.file(
      req.body.email + "/" + req.body.pname + "/" + req.file.originalname
    );
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
      next(err);
    });

    blobStream.on("finish", () => {
      res.status(200).send("Success");
    });

    blobStream.end(req.file.buffer);
  } else {
    res.status(400).send("unauthorized access");
  }
};

/*
 * Calls
 */
async function getFiles(req, res) {
  const currUser = jwtDecode(req.headers.token);

  if (currUser.isAdmin === true || currUser.email === req.query.email) {
    const pref = req.query.email + "/" + req.query.pname;
    const options = {
      prefix: pref,
    };

    const files = await storage.bucket(bucketName).getFiles(options);

    var fileName = [];
    files.forEach((element) => {
      //console.log(element);
      element.forEach((el) => {
        //console.log(el.name);
        fileName.push(el.name);
      });
    });

    res.send(fileName);
  } else {
    res.status(400).send("unauthorized access");
  }
}

// async function downloadFile(req, res) {
//   const file = bucket(bucketName).file(req.query.filename);
//   file.download({});
// };

async function deleteFile(req, res) {
  //console.log(req);
  const currUser = jwtDecode(req.headers.token);

  if (currUser.isAdmin === true) {
    await storage
      .bucket(bucketName)
      .file(req.body.params.fileName)
      .delete()
      .catch((err) => {});
  } else {
    res.status(400).send("unauthorized access");
  }
}

module.exports = { uploadFile, getFiles, deleteFile };
