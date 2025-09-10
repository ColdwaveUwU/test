// Test to verify Layout → Size → Super B/A3 sets correct page size in word/document.xml
const { PageSize, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

PageSize.setSize("Super B/A3");

FileMenu.downloadAs("docx");

Verification.openFile();
// Super B/A3 → w:w="17291", w:h="27609"
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:w", "17291");
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:h", "27609");

console.log(Verification.isSuccess());
Tester.close();
