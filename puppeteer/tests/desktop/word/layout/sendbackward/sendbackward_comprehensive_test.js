// sendbackward_comprehensive_test.js
// Test: Layout → Send Backward → Comprehensive send backward test
// Description: Test both send backward options sequentially with multiple shapes

const { Shape, SendBackward, FileMenu, Verification, TestData } = require("lib");

console.log("Starting comprehensive send backward test");

Tester.createFile("docx");

// Insert first shape (Diamond)
Shape.clickBasicShape(4);
Shape.drawShape({ startX: 100, startY: 100, endX: 300, endY: 300 });

// Insert second shape (Rectangle)
Shape.clickBasicShape(1);
Shape.drawShape({ startX: 150, startY: 150, endX: 350, endY: 350 });

// Insert third shape (Rounded Rectangle)
Shape.clickBasicShape(2);
Shape.drawShape({ startX: 200, startY: 200, endX: 400, endY: 400 });

Tester.waitAutosave();

// Initial check
FileMenu.downloadAs("docx");
Verification.openFile();
Verification.check("word/document.xml", "count(//wp:anchor) >= 1", true);

// Test both send backward options
const sendBackwardOptions = ["Send backward", "Send to background"];

for (const option of sendBackwardOptions) {
    console.log(`Testing send backward option: ${option}`);

    // Select the topmost shape by coordinates (last drawn)
    Shape.selectShapeByCoordinates({ startX: 200, startY: 200, endX: 400, endY: 400 });

    // Apply action
    SendBackward.sendBackward(option);
    Tester.waitAutosave();

    // Verify after each action
    FileMenu.downloadAs("docx");
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
}

// Test default action (no parameter)
console.log("Testing default send backward action");
Shape.selectShapeByCoordinates({ startX: 150, startY: 150, endX: 350, endY: 350 });
SendBackward.sendBackward();
Tester.waitAutosave();

FileMenu.downloadAs("docx");
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
