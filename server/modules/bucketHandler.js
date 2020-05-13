const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const {myAccessKeyId, mySecretAccessKey} = require('./../../key.js')



AWS.config.getCredentials(function(err) {
  if (err) console.log('error ', err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
    console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
  }
});

var s3 = new AWS.S3();
var filePath = "data/temp.png";

var params = {
  Bucket: 'glowing-pancake-us',
  Body : fs.createReadStream(filePath),
  Key : "folder/"+Date.now()+"_"+path.basename(filePath)
};


// console.log('running func')
const uploadImage = () => {
  s3.upload(params, function (err, data) {
    //handle error
    console.log('doing stuff')
    if (err) {
      console.log("Error", err);
    }

    //success
    if (data) {
      console.log("Uploaded in:", data.Location);
    }
  });
}

module.exports = {
  uploadImage
}
