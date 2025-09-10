// https://bugzilla.onlyoffice.com/show_bug.cgi?id=76009
// Test: Hotkey formatting (Bold, Italic, Underline) in shapes
// Steps:
// 1. Create first shape, add text, select all text, apply B+I+U formatting, then remove all formatting with repeated keys
// 2. Create second shape, add text, select all text, apply B+I+U formatting by pressing keys twice (toggle on/off)
// 3. Verify that formatting is correctly applied/removed in both shapes
const { Shape, FileMenu, TestData, Verification } = require("lib");
Tester.createFile("docx");

// Step 1: Insert first shape
Shape.openShapeList();
Shape.clickBasicShape(1);
Shape.drawShape();
// Add text to first shape
Tester.input(TestData.ONE_WORD_TEXT());
// Select all text in the shape
Tester.keyDown("Shift");
for (let i = 0; i < 10; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
// Apply formatting: Bold, Italic, Underline
Tester.keyDown("ControlLeft");
Tester.keyPress("B"); // Apply Bold
Tester.keyPress("I"); // Apply Italic
Tester.keyPress("U"); // Apply Underline
Tester.keyUp("ControlLeft");
// Exit shape editing mode
Tester.keyPress("Escape");
// Move to next position
for (let i = 0; i < 10; i++) {
    Tester.keyPress("Enter");
}
Tester.keyPress("PageUp");

// Step 2: Insert second shape
Shape.clickBasicShape(1);
Shape.drawShape();
// Add text to second shape
Tester.input("Hello World");
// Select all text in the shape
Tester.keyDown("Shift");
for (let i = 0; i < 10; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
// Apply and remove formatting by pressing keys twice (toggle)
Tester.keyDown("ControlLeft");
Tester.keyPress("B"); // Apply Bold
Tester.keyPress("B"); // Remove Bold
Tester.keyPress("I"); // Apply Italic
Tester.keyPress("I"); // Remove Italic
Tester.keyPress("U"); // Apply Underline
Tester.keyPress("U"); // Remove Underline
Tester.keyUp("ControlLeft");

// Step 3: Download and verify formatting
FileMenu.downloadAs("docx");
// Verify that formatting was correctly applied/removed
Verification.openFile();
Verification.check(
    "word/document.xml",
    "//w:p[5]/w:r[2]/mc:AlternateContent[1]/mc:Fallback[1]/w:pict[1]/v:shape[1]/v:textbox[1]/w:txbxContent[1]/w:p[1]/w:r[2]/w:rPr[1]/w:b[1]/@w:val",
    "0"
);
Verification.check(
    "word/document.xml",
    "//w:p[5]/w:r[2]/mc:AlternateContent[1]/mc:Fallback[1]/w:pict[1]/v:shape[1]/v:textbox[1]/w:txbxContent[1]/w:p[1]/w:r[2]/w:rPr[1]/w:i[1]/@w:val",
    "0"
);
Verification.check(
    "word/document.xml",
    "//w:p[5]/w:r[2]/mc:AlternateContent[1]/mc:Fallback[1]/w:pict[1]/v:shape[1]/v:textbox[1]/w:txbxContent[1]/w:p[1]/w:r[2]/w:rPr[1]/w:u[1]/@w:val",
    "none"
);
Verification.check(
    "word/document.xml",
    "//w:p[5]/w:r[2]/mc:AlternateContent[1]/mc:Fallback[1]/w:pict[1]/v:shape[1]/v:textbox[1]/w:txbxContent[1]/w:p[1]/w:r[2]/w:t[1]",
    "ello World"
);

Verification.check(
    "word/document.xml",
    "count(//wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:r[2]/w:rPr[1]/w:b[1]/@w:val)",
    1
);
Verification.check(
    "word/document.xml",
    "count(//wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:r[2]/w:rPr[1]/w:i[1]/@w:val)",
    1
);
Verification.check(
    "word/document.xml",
    "count(//wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:r[2]/w:rPr[1]/w:u[1]/@w:val)",
    2
);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

Tester.close();
