// wrapping_with_image.js
// Test: Layout → Wrapping → Test wrapping functionality with images
// Description: Test various wrapping options on inserted images

const { Image, FileMenu, Verification, TestData } = require("lib");

console.log("Starting wrapping with image test");

Tester.createFile("docx");

// Add some text for wrapping demonstration
Tester.input(TestData.LOREM_IPSUM());

// Insert an image
Image.fromFile("png/testFile.png");

// Test Square wrapping with image
Image.wrapSquare();

// Download document for XML verification
FileMenu.downloadAs("docx");

// Open document for verification
Verification.openFile();
// Verify that image was inserted
Verification.check("word/document.xml", "boolean(//pic:pic)", true);
Verification.check("word/document.xml", "boolean(//wp:wrapSquare)", true);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}
Tester.close();
