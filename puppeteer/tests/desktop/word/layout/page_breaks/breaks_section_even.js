// Test Layout → Breaks → Insert section break → Even page
const { FileMenu, Verification, PageBreakLayout } = require("lib");

Tester.createFile("docx");
// click Layout → Breaks → Section break → Even page
PageBreakLayout.insertPageBreakWithOptions({ section: { evenPage: true } });

FileMenu.downloadAs("docx");
Verification.openFile();

// check that in the section type="evenPage"
Verification.check("word/document.xml", "//w:sectPr[last()]/w:type/@w:val", "evenPage");

console.log(Verification.isSuccess());
Tester.close();
