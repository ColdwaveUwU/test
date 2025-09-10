/**
 * Test: Add footer text and verify footer part + relation.
 */
const { FileMenu, PageHeaderFooter, Verification } = require("lib");

Tester.createFile("docx");
PageHeaderFooter.editFooter("Footer 1");
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/footer1.xml", "boolean(//w:t[text()='Footer 1'])", true);
Verification.check("word/document.xml", "boolean(//w:sectPr//w:footerReference[@w:type='default'])", true);

console.log(Verification.isSuccess());
Tester.close();
