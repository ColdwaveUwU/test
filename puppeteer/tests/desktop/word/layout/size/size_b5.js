// Test to verify Layout → Size → B5 sets correct page size in word/document.xml
const { PageSize, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

PageSize.setSize("B5");

FileMenu.downloadAs("docx");

Verification.openFile();
// B5 → w:w="9978", w:h="14078"
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:w", "9978");
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:h", "14173");

console.log(Verification.isSuccess());
Tester.close();
