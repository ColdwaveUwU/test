/**
 * Test: Add a header, then remove the header, verify no headerReference remains,
 * and footerReference was never added.
 */
const { FileMenu, PageHeaderFooter, Verification } = require("lib");

Tester.createFile("docx");
PageHeaderFooter.editHeader("Temp");
Tester.keyPress("Escape");
PageHeaderFooter.removeHeader();
FileMenu.downloadAs("docx");
Verification.openFile();

Verification.check("word/document.xml", "boolean(//w:sectPr//w:headerReference)", false);
Verification.check("word/document.xml", "boolean(//w:sectPr//w:footerReference)", false);

console.log(Verification.isSuccess());
Tester.close();
