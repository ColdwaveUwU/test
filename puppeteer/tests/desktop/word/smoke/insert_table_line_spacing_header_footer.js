// function Mm2Inch(mm) {
//     return mm / 25.4;
// }

const { FileMenu, TestData, TextForm, Verification, Table, PageHeaderFooter, Image, ParagraphSettings } = require("lib");
Tester.createFile("docx");
Table.insertTable(5, 6);
// change table options
// type: 0 - change table
// type: 1 - change cell
// type: 2 - change borders & backgrounds
// type: 3 - text wrapping
// type: 4 - alternative text
// Table.setTableSettings([
//     { type: 0, top: 0, left: Mm2Inch(1.9), right: Mm2Inch(1.9), bottom: 0, width: Mm2Inch(127), spacing: 0 },\\todo
// ]);
Table.setTableAdvancedSettings({
    table: {
        tableSize: { width: { value: 5.5 } },
        cellMargins: { top: { value: 0 }, bottom: { value: 0 }, left: { value: 1.9 }, right: { value: 1.9 } },
    },
});
Tester.input("Example");
Tester.keyDown("ShiftLeft");
for (let i = 0; i < 3; i++) {
    Tester.keyPress("ArrowRight");
}
Tester.keyUp("ShiftLeft");
Tester.keyDown("ShiftLeft");
for (let i = 0; i < 2; i++) {
    Tester.keyPress("ArrowDown");
}
Tester.keyUp("ShiftLeft");

Tester.waitAutosave();
Table.setTableAdvancedSettings({
    backgroundBorder: {
        border: { size: "4.5 pt" },
        borderType: "all",
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:tblW[1]/@w:w", "7920");
Verification.check("word/document.xml", "count(//w:tr[*]/w:tc[*]/w:tcPr[1]/w:tcBorders[1]/w:top[1]/@w:sz)", 0);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

Tester.keyDown("ControlLeft");
Tester.keyPress("A");
Tester.keyUp("ControlLeft");
Tester.keyPress("Delete");
Tester.input(TestData.LOREM_IPSUM());

Tester.keyDown("ControlLeft");
Tester.keyPress("A");
Tester.keyUp("ControlLeft"); //Select all
TextForm.clickLineSpacing("3.0", { line: { spacingType: "Exactly", lineHeight: "1.18" } });
Tester.keyPress("PageDown");
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:spacing[1]/@w:line", "1699");
Verification.check("word/document.xml", "//w:spacing[1]/@w:lineRule", "exact");
isSuccess = Verification.isSuccess();
console.log(isSuccess);

// Add method for paragraph spacing before/after
Tester.keyDown("ControlLeft");
Tester.keyPress("A");
Tester.keyUp("ControlLeft"); //Select all
ParagraphSettings.setSpacingBefore("1.2");
ParagraphSettings.increaseSpacingBefore();
ParagraphSettings.setSpacingAfter("1.8");
ParagraphSettings.decreaseSpacingAfter();
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:spacing[1]/@w:after", "2578");
Verification.check("word/document.xml", "//w:spacing[1]/@w:before", "1742");
isSuccess = Verification.isSuccess();
console.log(isSuccess);

PageHeaderFooter.editFooter();
Image.fromFile("png/testFile.png");
PageHeaderFooter.close();
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/footer1.xml", "count( //a:graphic[1])", 1);
isSuccess = Verification.isSuccess();
console.log(isSuccess);

PageHeaderFooter.editHeader();
Table.insertTable(2, 2);
PageHeaderFooter.close();
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/header1.xml", "count(//w:tr[*]/w:tc[*]/w:tcPr[1]/w:tcW[1]/@w:w)", 4);
isSuccess = Verification.isSuccess();
console.log(isSuccess);
Tester.close();
