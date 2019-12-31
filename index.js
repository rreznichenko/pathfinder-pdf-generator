const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const pdfRender = require('./utils/pdf-render');

app.use(bodyParser.json());
app.use(cors())

function createChar(req, res) {
  fs.readFile('./public/Pathfinder_en.pdf', pdfRender);
  res.sendStatus(200)
}

app.post('/character', createChar);

app.get('/character', (req, res) => {
  fs.readFile('./public/charlist_edited.pdf', (err, fileData) => {
    if(err) {
      return res.send('some err');
    }
    res.contentType("application/pdf");
    res.send(fileData)
  })
});

app.get('*', (err, res) => {
  res.send('some-api');
})

app.listen(3002, () => {
  console.log('Example app listening on port 3000!');
});


