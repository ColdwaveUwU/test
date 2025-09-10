// Test to verify Layout → Size → Envelope Choukei 3 sets correct page size in word/document.xml
const { PageSize, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

PageSize.setSize("Envelope Choukei 3");

FileMenu.downloadAs("docx");

Verification.openFile();
// Envelope Choukei 3 → w:w="8400", w:h="13323"
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:w", "6803");
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:h", "13323");

console.log(Verification.isSuccess());
Tester.close();
