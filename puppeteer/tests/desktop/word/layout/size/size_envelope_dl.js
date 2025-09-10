// Test to verify Layout → Size → Envelope DL sets correct page size in word/document.xml
const { PageSize, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

PageSize.setSize("Envelope DL");

FileMenu.downloadAs("docx");

Verification.openFile();
// Envelope DL → w:w="6236", w:h="12472"
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:w", "6236");
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:h", "12472");

console.log(Verification.isSuccess());
Tester.close();
