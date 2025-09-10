// Checks that Layout → Size → A5 gives w:w="8380" and w:h="11906"
const { PageSize, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

PageSize.setSize("A5");

FileMenu.downloadAs("docx");

Verification.openFile();
// A5 → w:w=8391, w:h=11906
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:w", "8391");
Verification.check("word/document.xml", "//w:sectPr/w:pgSz/@w:h", "11906");

console.log(Verification.isSuccess());
Tester.close();
