const request = require('request');
const fs = require('fs');
const Promise = require('bluebird');
const  {
  promisedListObjects,
  promisedUploadImage
} = require('./bucketHandler.js')

const imageGetter = (uri, filename, cb) => {
  request
  .get(uri)
  .on('response', function(response) {
    //console.log(response.statusCode) // 200
    console.log(response.headers['content-type']) // 'image/png'


    if(response.statusCode === 200 && response.headers['content-type'] === ('image/jpeg' || 'image/png')){
      console.log('passes')
    } else {
      console.log('fails')
      cb('datatype mismatch', null);
    }
  })
  .pipe(fs.createWriteStream(filename))
  .on('close', () => {
    console.log('filedone')
    cb(null, 'filedone')
  })
}

const promisedGetter = Promise.promisify(imageGetter);


//download image from given uri to "data/temp.png" then upload to bucket with unique tag
const imageHandler = (uri, cb) => {
  promisedGetter(uri, './data/temp.png')
  .then(() => promisedUploadImage())
  //.then(() => promisedListObjects())
  .then(res => cb(null, res))
  .catch(err => {
    console.log(err);
    cb(err, null)
  })
}

const promisedImageHandler = Promise.promisify(imageHandler);

module.exports = {
  promisedImageHandler,

}



