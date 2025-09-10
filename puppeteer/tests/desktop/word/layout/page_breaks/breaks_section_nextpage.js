// Test Layout → Breaks → Insert section break → Next Page
const { FileMenu, Verification, PageBreakLayout } = require("lib");

Tester.createFile("docx");
// click Layout → Breaks → Section break → Next Page
PageBreakLayout.insertPageBreakWithOptions({ section: { nextPage: true } });

FileMenu.downloadAs("docx");
Verification.openFile();

// check that the last <w:sectPr> contains <w:type w:val="nextPage">
Verification.check("word/document.xml", "//w:sectPr[last()]/w:type/@w:val", "nextPage");

console.log(Verification.isSuccess());
Tester.close();
