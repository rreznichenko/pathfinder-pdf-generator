
const fs = require('fs');
const pdfRender = require('./utils/pdf-render');

fs.readFile('./public/Pathfinder_en.pdf', pdfRender);
