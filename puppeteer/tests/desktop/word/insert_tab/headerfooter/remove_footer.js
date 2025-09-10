/**
 * Test: Add a footer, then remove the footer, verify no footerReference remains,
 * and headerReference was never added.
 */
const { FileMenu, PageHeaderFooter, Verification } = require("lib");

Tester.createFile("docx");
PageHeaderFooter.editFooter("Temp");
Tester.keyPress("Escape");
PageHeaderFooter.removeFooter();
FileMenu.downloadAs("docx");
Verification.openFile();

Verification.check("word/document.xml", "boolean(//w:sectPr//w:footerReference)", false);
Verification.check("word/document.xml", "boolean(//w:sectPr//w:headerReference)", false);

console.log(Verification.isSuccess());
Tester.close();
