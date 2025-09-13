// This test verifies creating a new document with sample content
const { FileMenu, Verification } = require("lib");

const fileName = "docx";

Tester.createFile(fileName);

FileMenu.createNew("With sample content");

FileMenu.downloadAs("docx");

Verification.openFile();
const filePath = "word/document.xml";

const editorsXpath = "//w:r[w:rPr/w:color[@w:val='2f5496']][w:rPr/w:sz[@w:val='40']]/w:t[text()='Editors']";
Verification.check(filePath, editorsXpath, "Editors");

if (!Verification.isSuccess()) {
    throw new Error("Sample content template missing formatted 'Editors' text with specific styling");
}

console.log(
    "Document with sample content created and verified successfully - contains formatted 'Editors' text from template"
);

Tester.close();
