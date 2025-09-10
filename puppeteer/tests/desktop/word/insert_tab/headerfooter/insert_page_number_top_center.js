/**
 * Test: Insert current page number (PAGE) into header — top/center.
 */
const { FileMenu, PageHeaderFooter, Verification } = require("lib");

Tester.createFile("docx");
PageHeaderFooter.insertPageNumber({ top: "center" });
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check(
    "word/header1.xml",
    "boolean(//w:fldSimple[contains(@w:instr,'PAGE')] | //w:instrText[contains(.,'PAGE')])",
    true
);

console.log(Verification.isSuccess());
Tester.close();
