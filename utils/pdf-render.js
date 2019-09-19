const fs = require('fs');
const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');


async function renderPdf(err, data) {
  if(err) {
    return err;
  }

  const pdfDoc = await PDFDocument.load(data)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { width, height } = firstPage.getSize()

  firstPage.drawText('This text was added with JavaScript!', {
    x: 5,
    y: height / 2 + 300,
    size: 50,
    font: helveticaFont,
    color: rgb(1, 0.1, 0.1),
    rotate: degrees(-45),
  })

  const pdfBytes = await pdfDoc.save();

  fs.writeFile('./public/charlist_edited1.pdf', pdfBytes,{falg: 'r+'},  (err) => {
    if (err) throw err;
  });

}

module.exports = renderPdf;