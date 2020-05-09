const request = require('request');
const fs = require('fs');
const Promise = require('bluebird');

const imageGetter = (uri, filename, cb) => {
  //request.head(uri, (err, res, body) => {
    request
    .get(uri)
    .on('response', function(response) {
      console.log(response.statusCode) // 200
      console.log(response.headers['content-type']) // 'image/png'
      if(response.statusCode === 200 && response.headers['content-type'] === 'image/jpeg'){
        console.log('passes')
      } else {
        console.log('fails')
      }
    })
    //.on('error', () => cb('file not found', null))
    .pipe(fs.createWriteStream(filename))
    .on('close', () => cb(null, 'filedone'))

  //})
}

const promisedGetter = Promise.promisify(imageGetter);

const imageHandler = (uri, cb) => {
  promisedGetter(uri, 'temp.png')
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
}

module.exports = {
  imageHandler
}



