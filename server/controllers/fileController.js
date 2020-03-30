const {Storage} = require('@google-cloud/storage')


//Keys expire after sprint2 and have to be regenerated
//const projectId = 'polished-engine-272617'
//const keyFilename = '../keys/keyFile'


const bucketName = 'gonzl_1'

//create a client
const storage = new Storage();

async function uploadFile(req, res) {

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

/*
  await storage.bucket(bucketName).upload(filePath, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    // By setting the option `destination`, you can change the name of the
    // object you are uploading to a bucket.
    metadata: {
      // Enable long-lived HTTP caching headers
      // Use only if the contents of the file will never change
      // (If the contents will change, use cacheControl: 'no-cache')
      cacheControl: 'public, max-age=31536000',
    },
  });
*/ 
  console.log(`${req.query.filename} uploaded to ${bucketName}.`);
}

async function getFiles(req, res) {
  const pref = '/' + req.query.email;
  const options = {
    prefix: pref,
  };

  const [files] = await storage.bucket(bucketName).getFiles(options)
  res.json(JSON.stringify(files));
};

//Delete function below, using public endpoints instead
async function downloadFile(req, res) {
  const file = bucket(bucketName).file(req.query.filename);
  file.download({});

};

module.exports = { uploadFile, getFiles, downloadFile};
