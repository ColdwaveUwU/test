// Test Layout → Breaks → Insert section break → Continuous
const { FileMenu, Verification, PageBreakLayout } = require("lib");

Tester.createFile("docx");
// click Layout → Breaks → Section break → Continuous
PageBreakLayout.insertPageBreakWithOptions({ section: { contPage: true } });

FileMenu.downloadAs("docx");
Verification.openFile();

// check that the section has type="continuous"
Verification.check("word/document.xml", "//w:sectPr[last()]/w:type/@w:val", "continuous");

console.log(Verification.isSuccess());
Tester.close();
