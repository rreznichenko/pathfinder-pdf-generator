const fs = require('fs');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function drawText(file, characterSpec) {
    const pdfDoc = await PDFDocument.load(file)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    characterSpec.forEach(item => {
        firstPage.drawText(item.text, {
            x: item.x,
            y: item.y,
            size: 14,
            font: helveticaFont,
            color: rgb(1, 0, 1),
        })
    })
    
    return await pdfDoc.save();
}

function pdfDrawer(path, characterSpec) {
    fs.readFile(path, async (err, data) => {
        if(err) {
            return err;
        }
       
        const pdfBytes = await drawText(data, characterSpec);
    
        fs.writeFile('./public/charlist_edited.pdf', pdfBytes,{},  (err) => {
            if (err) console.log(err);
        });

    });
}

module.exports = pdfDrawer;

