// hyphenation_non_numeric_test.js
// Test: Layout → Hyphenation → Non-Numeric Value Rejection
// Description: Test that hyphenation dialog properly handles non-numeric values
// EXPECTED BEHAVIOR: System should reject non-numeric values or handle them gracefully

const { TestData, Hyphenation, FileMenu, Verification } = require("lib");

console.log("Starting non-numeric hyphenation values test");

Tester.createFile("docx");
Tester.input(TestData.LOREM_IPSUM());

// Test non-numeric values in hyphenation dialog
const testValues = {
    automaticallyHyphenate: true,
    hyphenateWordsInCaps: false,
    hyphenationZone: { value: "abc123" },
    limitConsecutiveHyphens: { value: "xyz" },
};
Hyphenation.setHyphenationSettings(testValues);

// Download document for XML verification
FileMenu.downloadAs("docx");

// Open document for verification
Verification.openFile();

Verification.check("word/settings.xml", "boolean(//w:autoHyphenation)", true); // Check automaticallyHyphenate

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}
Tester.close();
