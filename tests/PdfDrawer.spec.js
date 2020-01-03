const PDFDrawer = require('../utils/PdfDrawer');
const fs = require('fs');
describe('pdfDrwer test', () => {
  test('pdfDrawer init', () => {
    const PdfDrawerObj = new PDFDrawer('./public/Pathfinder_en.pdf');
    expect(typeof PdfDrawerObj).toBe('object');
  });

  test('check path of util', done => {
    const PdfDrawerObj = new PDFDrawer('./public/Pathfinder_en.pdf');
    fs.readFile(PdfDrawerObj.filePath, (err, data) => {
        console.log(data);
        PdfDrawerObj.setDocument(data);
        console.log(PdfDrawerObj.document);
        expect(typeof PdfDrawerObj).toBe('object');
        done();
    });
  });


});
