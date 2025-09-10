// Test to verify that setting Layout → Orientation to Landscape in a DOCX document
// results in w:orient="landscape" in word/document.xml
const { PageOrientation, FileMenu, Verification } = require("lib");

Tester.createFile("docx");
PageOrientation.setOrientation("Landscape");

FileMenu.downloadAs("docx");
Verification.openFile();
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:orient", "landscape");

console.log(Verification.isSuccess());
Tester.close();
