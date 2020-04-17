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

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', (err) => {
    next(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    //const publicUrl = format(
    //  `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    //);
    console.log(req);
    res.status(200).send("Success");
  });
  blobStream.end(req.file.buffer);
};





/*
const uploadFile = async (req, res) => {

  //console.log(req.file);
  //console.log(req.email)
  console.log("Reached uploadFile")
  res.send("I have reached upload")

  const filePath = "../../../../dummyFiles/dummy_original.pdf"
  //require("../../../../dummyFiles/dummy_original.pdf")
/*  
  // Uploads a local file to the bucket
  //console.log(req);
  const newName = req.query.email + '/' + req.query.filename;
  const options = {
      destination: newName,                                          //come up with a naming scheme for files
      metadata: {
          metadata: {
              user: req.email
          }
      }
  };
  storage.bucket(bucketName).upload(req.query.path, options, function(err, file) { });
*/

/*
  storage.bucket(bucketName).upload(filePath, {
    gzip: true,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  })
  .catch (error => {console.log(error)});

//  console.log(`${req.query.filename} uploaded to ${bucketName}.`);
}
*/


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

module.exports = { uploadFile, getFiles};
