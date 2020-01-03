const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const pdfRender = require('./utils/pdf-render');
const pdfDrawer = require('./utils/PdfDrawer');

app.use(bodyParser.json());
app.use(cors())

function createDemo(req, res) {
  fs.readFile('./public/Pathfinder_en.pdf', pdfRender);
  res.sendStatus(200)
}

function createCharacterFile(req, res) {
  // const characterDetails = req.body;
  const body = [
    {
      text: "test1",
      x: 1,
      y: 1
    },
    {
      text: "test2",
      x: 10,
      y: 10
    },
    {
      text: "test3",
      x: 100,
      y: 100
    },
  ]
  
  pdfDrawer('./public/Pathfinder_en.pdf', body);
}

app.post('/character', createCharacterFile);

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
  createCharacterFile({}, {});
  res.send('some-api');
})

app.listen(3002, () => {
  console.log('Example app listening on port 3000!');
});


