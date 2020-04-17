const {Storage} = require('@google-cloud/storage')


//Keys expire after sprint2 and have to be regenerated
const projectId = 'polished-engine-272617'
const keyFilename = 'server/keys/keyFile.json'

const bucketName = 'gonzl-2'

//create a client
const storage = new Storage({projectId, keyFilename});
const bucket = storage.bucket(bucketName);

const uploadFile = (req, res, next) => {

  console.log("upload File () called");
  if (!req.file) {
    console.log(req);
    res.status(400).send('No file uploaded.');
    return;
  }

  console.log(req.body);
  // Create a new blob in the bucket and upload the file data.
  
  const blob = bucket.file(req.body.email + '/' + req.body.pname + '/' + req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', (err) => {
    next(err);
  });

  blobStream.on('finish', () => {
    res.status(200).send("Success");
  });
  
  blobStream.end(req.file.buffer);
};


/*
 * Calls 
 */
async function getFiles(req, res) {
  const pref = req.query.email +'/' + req.query.pname;
  const options = {
    prefix: pref,
  };

  const files =  await storage.bucket(bucketName).getFiles(options);

  var fileName = []
  files.forEach(element => {
    //console.log(element);
    element.forEach(el => {
      console.log(el.name);
      fileName.push(el.name);
    })
  })

res.send(fileName);

};

// async function downloadFile(req, res) {
//   const file = bucket(bucketName).file(req.query.filename);
//   file.download({});
// };

async function deleteFile(req, res) {
  //console.log(req);
  await storage.bucket(bucketName).file(req.body.params.fileName).delete();
}

module.exports = { uploadFile, getFiles, deleteFile};
