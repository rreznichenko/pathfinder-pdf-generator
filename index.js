const fs = require('fs');
const express = require('express');
const app = express();
const pdfRender = require('./utils/pdf-render');


function createChar(err, res) {
  fs.readFile('./public/Pathfinder_en.pdf', pdfRender);
  res.sendStatus(200)
}

app.post('/char', createChar);

app.get('/char', (err, res) => {
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

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});


