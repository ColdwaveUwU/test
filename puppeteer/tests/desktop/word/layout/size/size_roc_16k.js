// Test to verify Layout → Size → ROC 16K sets correct page size in word/document.xml
const { PageSize, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

PageSize.setSize("ROC 16K");

FileMenu.downloadAs("docx");

Verification.openFile();
// ROC 16K → w:w="11157", w:h="15477"
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:w", "11157");
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:h", "15477");

console.log(Verification.isSuccess());
Tester.close();
