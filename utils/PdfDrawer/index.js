const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');

class PdfDrawer {

    constructor(path) {
        const self = this;
        this.document = {};
        this.font = '';
        this.fontSize = '';
        this.filePath = path;
        fs.readFile(path, (err, data) => {
            self.setDocument(data);
        })
    }

    async setDocument(data) {
        this.document = await PDFDocument.load(data)
        return this;
    }

    async setFont(font) {
        this.font = await this.document.embedFont(font);
        return this;
    }

    setFontSize(size) {
        this.fontSize = size;
        return this;
    }

    getPages() {
        return this.document.getPages();
    }

    getPageSize(page) {
        return {width, height} = page.getSize();
    }

    draw({page, text, x, y, color} = {}) {
        page.drawText(text, {
            x: x,
            y: y,
            size: this.fontSize,
            font: this.font,
            color: rgb(...color),
        })
        return this;
    }

    async save() {
        const bytes = await this.document.save();
        fs.writeFile(this.path, bytes, {}, (err) => {
            if (err) console.log(err);
        });
    }
}

module.exports = PdfDrawer;