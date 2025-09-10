class Pdf {
    constructor(tester) {
        if (tester) {
            this.tester = tester;
        } else {
            this.tester = RegularTester;
        }
    }

    /**
     * Return text from PDF file
     * @param {string} filePath - path to PDF file
     */
    async getText(filePath) {
        const pdfjs = await import ('../../../engine/node_modules/pdfjs-dist/legacy/build/pdf.mjs');
        let doc = await pdfjs.getDocument(filePath).promise;
        let page1 = await doc.getPage(1);
        let content = await page1.getTextContent();
        return content.items.map(function(item) {
            return item.str;
        });
    }
}
module.exports = Pdf;
