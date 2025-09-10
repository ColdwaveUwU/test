// bringforward_comprehensive_test.js
// Test: Layout → Bring Forward → Comprehensive bring forward test
// Description: Test all bring forward options sequentially with multiple shapes

const { Shape, BringForward, FileMenu, Verification, TestData } = require("lib");

console.log("Starting comprehensive bring forward test");

Tester.createFile("docx");

// Add some text for context
Tester.input(TestData.LOREM_IPSUM());

// Create multiple overlapping shapes to test layering
console.log("Creating multiple shapes for layering test");

// Shape 1 - Diamond
Shape.clickBasicShape(4); // Diamond shape
Shape.drawShape({ startX: 100, startY: 100, endX: 300, endY: 300 });

// Shape 2 - Rectangle
Shape.clickBasicShape(1); // Rectangle shape
Shape.drawShape({ startX: 150, startY: 150, endX: 350, endY: 350 });

Tester.waitAutosave();

// Test both bring forward options
const bringForwardOptions = ["Bring forward", "Bring to foreground"];
Tester.keyPress("Tab");
for (const option of bringForwardOptions) {
    console.log(`Testing bring forward option: ${option}`);
    BringForward.bringForward(option);
    Tester.waitAutosave(); // Brief pause between changes
}

// Test default action (no parameter)
console.log("Testing default bring forward action");
BringForward.bringForward();

// Final verification
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
