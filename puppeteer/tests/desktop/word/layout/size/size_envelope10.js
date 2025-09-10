// Test to verify Layout → Size → Envelope #10 sets correct page size in word/document.xml
const { PageSize, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

PageSize.setSize("Envelope #10");

FileMenu.downloadAs("docx");

Verification.openFile();
// Envelope #10 → w:w="5941", w:h="13680"
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:w", "5941");
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:h", "13680");

console.log(Verification.isSuccess());
Tester.close();
