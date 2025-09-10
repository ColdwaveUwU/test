// wrapping_in_line_with_text.js
// Test: Layout → Wrapping → In line with text
// Description: Test wrapping "In line with text" option on shapes

const { Shape, Wrapping, FileMenu, Verification } = require("lib");

console.log("Starting 'In line with text' wrapping test");

Tester.createFile("docx");

// Insert a shape to test wrapping
Shape.clickBasicShape(2); // Rectangle shape
Shape.drawShape();

// Set wrapping to "In line with text"
Wrapping.setWrapping("In line with text");

// Download document for XML verification
FileMenu.downloadAs("docx");

// Open document for verification
Verification.openFile();
// Verify that shape exists (for inline, no specific wrapping elements)
Verification.check("word/document.xml", "boolean(//wp:inline)", true);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}
Tester.close();
