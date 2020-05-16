const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {promisedImageHandler} = require('./modules/imageGetter.js')

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());


app.use('/', express.static(path.join(__dirname, './../client/dist')));

app.get('/api/test', (req, res) => {
  // res.status(200).send(data); //ok
  res.status(404).end(); //not found
});

app.post('/api/image', (req, res) => {
  let imageLocation = req.body.url;
  promisedImageHandler(imageLocation)
  .then(data => {
    //console.log('pass ', data)
    res.status(201).end()
  })
  .catch(err => {
    //console.log('fail', err)
    res.status(404).end()
  })

});

app.put('/api/test', (req, res) => {
  // res.status(200).end(); //ok
  // res.status(204).end(); //no content
  res.status(404).end(); //not found
});

app.delete('/api/test', (req, res) => {
  // res.status(200).end(); //ok
  res.status(404).end(); //not found
});

app.listen(port, ()=> (console.log('listening to port: ', port)));
