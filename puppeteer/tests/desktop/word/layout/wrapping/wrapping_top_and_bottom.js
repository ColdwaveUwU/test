// wrapping_top_and_bottom.js
// Test: Layout → Wrapping → Top and bottom
// Description: Test wrapping "Top and bottom" option on shapes

const { Shape, Wrapping, FileMenu, Verification } = require("lib");

console.log("Starting 'Top and bottom' wrapping test");

Tester.createFile("docx");

// Insert a shape to test wrapping
Shape.clickBasicShape(2); // Rectangle shape
Shape.drawShape();

// Set wrapping to "Top and bottom"
Wrapping.setWrapping("Top and bottom");

// Download document for XML verification
FileMenu.downloadAs("docx");

// Open document for verification
Verification.openFile();
// Verify the wrapping setting in document XML
Verification.check("word/document.xml", "boolean(//wp:wrapTopAndBottom)", true);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}
Tester.close();
