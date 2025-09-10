// bringforward_to_foreground.js
// Test: Layout → Bring Forward → Bring to foreground
// Description: Test "Bring to foreground" option on shapes

const { Shape, BringForward, FileMenu, Verification } = require("lib");

console.log("Starting 'Bring to foreground' test");

Tester.createFile("docx");

// Insert Diamond shape
Shape.clickBasicShape(4); // Diamond shape
Shape.drawShape({ startX: 100, startY: 100, endX: 300, endY: 300 });

// Insert Rectangle shape
Shape.clickBasicShape(1); // Rectangle shape
Shape.drawShape({ startX: 150, startY: 150, endX: 350, endY: 350 });

Tester.waitAutosave();

Tester.keyPress("Tab");

// Apply "Bring to foreground" action
BringForward.bringForward("Bring to foreground");
Tester.waitAutosave();

// Download document for XML verification
FileMenu.downloadAs("docx");

// Open document for verification
Verification.openFile();

const anchorPath = "//*[local-name()='anchor' or local-name()='inline']";

Verification.check("word/document.xml", "count(" + anchorPath + ") >= 2", true);

Verification.check(
    "word/document.xml",
    "boolean( number((" +
        anchorPath +
        ")[2]/@relativeHeight) != " +
        "number((" +
        anchorPath +
        ")[1]/@relativeHeight) )",
    true
);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
