const path = require("path");
const { FileMenu } = require("lib");
const { Pdf } = require("lib");
const { TestData } = require("lib");
Tester.createFile("docx");

Tester.input(TestData.ONE_WORD_TEXT());

FileMenu.downloadAs("pdf");
// ToDo replace new.pdf to fileName method
const filePath = path.join(downloadDir, Tester.getFileName());
const arrText = Pdf.getText(filePath);
if (-1 === arrText.indexOf(TestData.ONE_WORD_TEXT()))
    throw new Error(`Error with download Pdf and check string in PDF`);

Tester.close();
