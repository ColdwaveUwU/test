// Test to verify Layout → Size → A3 sets correct page size in word/document.xml
const { PageSize, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

PageSize.setSize("A3");

FileMenu.downloadAs("docx");

Verification.openFile();
// A3 → w:w="16838", w:h="23811"
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:w", "16838");
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:h", "23811");

console.log(Verification.isSuccess());
Tester.close();
