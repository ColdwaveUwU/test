// This test verifies creating a new document with sample content
const { FileMenu, Verification } = require("lib");

const fileName = "docx";

Tester.createFile(fileName);

FileMenu.createNew("sample");

FileMenu.downloadAs("docx");

Verification.openFile();
const filePath = "word/document.xml";

const editorsXpath = "//w:body[1]/w:p[1]/w:r[5]/w:t[1]";
Verification.check(filePath, editorsXpath, "Editors");

if (!Verification.isSuccess()) {
    throw new Error("Sample content template missing formatted 'Editors' text with specific styling");
}

console.log(
    "Document with sample content created and verified successfully - contains formatted 'Editors' text from template"
);

Tester.close();
