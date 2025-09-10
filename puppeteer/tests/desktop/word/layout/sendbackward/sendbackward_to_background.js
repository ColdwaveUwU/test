// sendbackward_to_background.js
// Test: Layout → Send Backward → Send to background
// Description: Test "Send to background" option on shapes

const { Shape, SendBackward, FileMenu, Verification } = require("lib");

console.log("Starting 'Send to background' test");

Tester.createFile("docx");

// Insert Diamond shape
Shape.clickBasicShape(4); // Diamond shape
Shape.drawShape({ startX: 100, startY: 100, endX: 300, endY: 300 });

// Insert Rectangle shape (will be on top initially)
Shape.clickBasicShape(1); // Rectangle shape
Shape.drawShape({ startX: 150, startY: 150, endX: 350, endY: 350 });

Tester.waitAutosave();

// Initial verification of anchors
FileMenu.downloadAs("docx");
Verification.openFile();
Verification.check("word/document.xml", "count(//wp:anchor) >= 1", true);

// Select Rectangle and apply "Send to background" (sends to bottom layer)
Shape.selectShapeByCoordinates({ startX: 150, startY: 150, endX: 350, endY: 350 });
SendBackward.sendBackward("Send to background");
Tester.waitAutosave();

// Download document for XML verification
FileMenu.downloadAs("docx");

// Open document for verification
Verification.openFile();

const anchorPath = "//*[local-name()='anchor' or local-name()='inline']";

// Ensure there are at least two anchored objects
Verification.check("word/document.xml", "count(" + anchorPath + ") >= 2", true);

// Ensure layer order changed (relativeHeight values differ)
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

console.log("✓ Send to background operation completed successfully");

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
