/**
 * Test: Add header text and verify header part + relation.
 */
const { FileMenu, PageHeaderFooter, Verification } = require("lib");

Tester.createFile("docx");
PageHeaderFooter.editHeader("Header 1");
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/header1.xml", "boolean(//w:t[text()='Header 1'])", true);
Verification.check("word/document.xml", "boolean(//w:sectPr//w:headerReference[@w:type='default'])", true);

console.log(Verification.isSuccess());
Tester.close();
