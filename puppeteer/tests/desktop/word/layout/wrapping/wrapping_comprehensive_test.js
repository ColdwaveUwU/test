// wrapping_comprehensive_test.js
// Test: Layout → Wrapping → Comprehensive wrapping test
// Description: Test all wrapping options sequentially on the same shape

const { Shape, Wrapping, FileMenu, Verification, TestData } = require("lib");

console.log("Starting comprehensive wrapping test");

Tester.createFile("docx");

// Add some text for wrapping demonstration
Tester.input(TestData.LOREM_IPSUM());

// Insert a shape
Shape.clickBasicShape(5); // Circle shape
Shape.drawShape();

// Test all wrapping options sequentially
const wrappingOptions = [
    "In line with text",
    "Square",
    "Tight",
    "Through",
    "Top and bottom",
    "In front of text",
    "Behind text",
];

for (const option of wrappingOptions) {
    console.log(`Testing wrapping option: ${option}`);
    Wrapping.setWrapping(option);
    Tester.waitAutosave(); // Brief pause between changes
}

// Final verification with last option
FileMenu.downloadAs("docx");

Verification.openFile();
// Verify the final wrapping option "Behind text" is applied correctly
Verification.check("word/document.xml", "boolean(//wp:anchor[@behindDoc='1'])", true);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}
Tester.close();
