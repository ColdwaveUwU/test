// Checks that Layout → Size → US Letter gives w:w="12240" and w:h="15840"
const { PageSize, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

PageSize.setSize("US Letter");

FileMenu.downloadAs("docx");
Verification.openFile();

Verification.openFile();
// US Letter → w:w=12240, w:h=15840
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:w", "12240");
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:h", "15840");

console.log(Verification.isSuccess());
Tester.close();
