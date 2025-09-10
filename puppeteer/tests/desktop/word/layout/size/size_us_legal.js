// Test to verify Layout → Size → US Legal sets correct page size in word/document.xml
const { PageSize, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

PageSize.setSize("US Legal");

FileMenu.downloadAs("docx");

Verification.openFile();
// US Legal → w:w="12240", w:h="20160"
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:w", "12240");
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:h", "20160");

console.log(Verification.isSuccess());
Tester.close();
