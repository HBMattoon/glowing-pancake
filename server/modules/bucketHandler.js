const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const {myBucket, URIprefix} = require('./../../key.js');
const Promise = require('bluebird');



// AWS.config.getCredentials(function(err) {
//   if (err) console.log('error ', err.stack);
//   // credentials not loaded
//   else {
//     //console.log("Access key:", AWS.config.credentials.accessKeyId);
//     //console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
//   }
// });

var s3 = new AWS.S3();
var filePath = "data/temp.png";

var listParams = {
  Bucket: myBucket,
  MaxKeys: 5
};


// console.log('running func')
const uploadImage = (cb) => {

  const postParams = {
    Bucket: myBucket,
    Body : fs.createReadStream(filePath),
    Key : "folder/"+Date.now()+"_"+path.basename(filePath)
  };

  //console.log('uploading with: ', postParams);

  s3.upload(postParams, function (err, data) {
    if (err) {
      //console.log("Error", err);
      cb(err, null)
    }
    if (data) {
      //console.log("Uploaded in:", data.Location);
      cb(null, data)

    }
  });
}

const listImageAdress = (cb) => {
  s3.listObjectsV2(listParams, function(err, data) {
    if (err){
      cb(err, null)
    } else {
      data = cleanData(data);
      cb(null, data)
    }
  });
}

const cleanData = (data) => {
  let result = {};
  result.images = data.Contents.map(item => {
    return URIprefix + item.key
  })
  return result;
}

const promisedListObjects = Promise.promisify(listImageAdress);
const promisedUploadImage = Promise.promisify(uploadImage);

module.exports = {
  promisedListObjects,
  promisedUploadImage
}
