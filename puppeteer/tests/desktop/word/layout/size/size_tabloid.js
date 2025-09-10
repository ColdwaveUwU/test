// Test to verify Layout → Size → Tabloid sets correct page size in word/document.xml
const { PageSize, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

PageSize.setSize("Tabloid");

FileMenu.downloadAs("docx");

Verification.openFile();
// Tabloid → w:w="15840", w:h="24480"
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:w", "15840");
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:h", "24480");

console.log(Verification.isSuccess());
Tester.close();
