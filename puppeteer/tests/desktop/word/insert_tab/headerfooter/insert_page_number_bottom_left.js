/**
 * Test: Insert current page number (PAGE) into footer — bottom/left.
 */
const { FileMenu, PageHeaderFooter, Verification } = require("lib");

Tester.createFile("docx");
PageHeaderFooter.insertPageNumber({ bottom: "left" });
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check(
    "word/footer1.xml",
    "boolean(//w:fldSimple[contains(@w:instr,'PAGE')] | //w:instrText[contains(.,'PAGE')])",
    true
);

console.log(Verification.isSuccess());
Tester.close();
