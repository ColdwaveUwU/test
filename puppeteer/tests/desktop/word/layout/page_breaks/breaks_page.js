// Test Layout → Breaks → Insert page break
const { FileMenu, Verification, PageBreakLayout } = require("lib");

Tester.createFile("docx");
// click Layout → Breaks → Insert page break
PageBreakLayout.insertPageBreakWithOptions({ pageBreak: true });

FileMenu.downloadAs("docx");
Verification.openFile();

// in body we search for <w:br w:type="page">
Verification.check("word/document.xml", "boolean(//w:body//w:br[@w:type='page'])", true);

console.log(Verification.isSuccess());
Tester.close();
