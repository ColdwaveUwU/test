// sendbackward_default.js
// Test: Layout → Send Backward → Default action
// Description: Test default send backward action on shapes

const { Shape, SendBackward, FileMenu, Verification } = require("lib");

console.log("Starting default 'Send Backward' test");

Tester.createFile("docx");

// Insert Diamond shape
Shape.clickBasicShape(4); // Diamond shape
Shape.drawShape({ startX: 100, startY: 100, endX: 300, endY: 300 });

// Insert Rectangle shape (will be on top initially)
Shape.clickBasicShape(1); // Rectangle shape
Shape.drawShape({ startX: 150, startY: 150, endX: 350, endY: 350 });

Tester.waitAutosave();

// Pre-check: download and open for XML verification
FileMenu.downloadAs("docx");
Verification.openFile();
Verification.check("word/document.xml", "count(//wp:anchor) >= 1", true);

// Select Rectangle (top shape) and perform default send backward action
Shape.selectShapeByCoordinates({ startX: 150, startY: 150, endX: 350, endY: 350 });
SendBackward.sendBackward("Send backward");
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

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
