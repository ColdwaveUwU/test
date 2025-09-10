// Checks that Layout → Size → A4 gives w:w="11906" and w:h="16838" in word/document.xml
const { PageSize, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

PageSize.setSize("A4");

FileMenu.downloadAs("docx");

Verification.openFile();
// A4 → w:w=11906, w:h=16838
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:w", "11906");
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:h", "16838");

console.log(Verification.isSuccess());
Tester.close();
