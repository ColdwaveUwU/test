// Test to verify Layout → Size → Tabloid Oversize sets correct page size in word/document.xml
const { PageSize, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

PageSize.setSize("Tabloid Oversize");

FileMenu.downloadAs("docx");

Verification.openFile();
// Tabloid Oversize → w:w="16832", w:h="25920"
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:w", "16832");
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:h", "25920");

console.log(Verification.isSuccess());
Tester.close();
