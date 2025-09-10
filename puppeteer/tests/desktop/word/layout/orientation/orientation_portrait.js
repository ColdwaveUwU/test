// Test to verify that setting Layout → Orientation to Portrait in a DOCX document
// results in w:orient="portrait" in word/document.xml
const { PageOrientation, FileMenu, Verification } = require("lib");

Tester.createFile("docx");
PageOrientation.setOrientation("Portrait");

FileMenu.downloadAs("docx");
Verification.openFile();
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:orient", "portrait");

console.log(Verification.isSuccess());
Tester.close();
