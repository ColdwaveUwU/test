// Test Layout → Breaks → Insert column break
const { FileMenu, Verification, PageBreakLayout } = require("lib");

Tester.createFile("docx");
// click Layout → Breaks → Insert column break
PageBreakLayout.insertPageBreakWithOptions({ columnBreak: true });

FileMenu.downloadAs("docx");
Verification.openFile();

// in body we search for <w:br w:type="column">
Verification.check("word/document.xml", "boolean(//w:body//w:br[@w:type='column'])", true);

console.log(Verification.isSuccess());
Tester.close();
