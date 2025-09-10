// Test Layout → Breaks → Insert section break → Odd page
const { FileMenu, Verification, PageBreakLayout } = require("lib");

Tester.createFile("docx");
// click Layout → Breaks → Section break → Odd page
PageBreakLayout.insertPageBreakWithOptions({ section: { oddPage: true } });

FileMenu.downloadAs("docx");
Verification.openFile();

// check that in the section type="oddPage"
Verification.check("word/document.xml", "//w:sectPr[last()]/w:type/@w:val", "oddPage");

console.log(Verification.isSuccess());
Tester.close();
