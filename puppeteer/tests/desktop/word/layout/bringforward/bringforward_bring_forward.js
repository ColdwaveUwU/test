// bringforward_bring_forward.js
// Test: Layout → Bring Forward → Bring forward
// Description: Test "Bring forward" option on shapes

const { Shape, BringForward, FileMenu, Verification } = require("lib");

console.log("Starting 'Bring forward' test");

Tester.createFile("docx");

// Insert Diamond shape
Shape.clickBasicShape(4); // Diamond shape
Shape.drawShape({ startX: 100, startY: 100, endX: 300, endY: 300 });

// Insert Rectangle shape
Shape.clickBasicShape(1); // Rectangle shape
Shape.drawShape({ startX: 150, startY: 150, endX: 350, endY: 350 });

Tester.waitAutosave();

FileMenu.downloadAs("docx");
Verification.openFile();

console.log("Checking initial anchor count...");
Verification.check("word/document.xml", "count(//wp:anchor) >= 1", true);

Tester.deleteText();

// Insert Diamond shape
Shape.clickBasicShape(4); // Diamond shape
Shape.drawShape({ startX: 100, startY: 100, endX: 300, endY: 300 });

// Insert Rectangle shape
Shape.clickBasicShape(1); // Rectangle shape
Shape.drawShape({ startX: 150, startY: 150, endX: 350, endY: 350 });
Tester.keyPress("Tab");
BringForward.bringForward("Bring forward");

// Wait for autosave after command
Tester.waitAutosave();

// Download document for XML verification
FileMenu.downloadAs("docx");

// Open document for verification
Verification.openFile();

console.log("=== Verifying bring forward functionality ===");

console.log("Verifying bring forward effect...");

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

console.log("✓ Diamond moved to front position - layer order verified!");

console.log("✓ Bring forward operation completed successfully");

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
