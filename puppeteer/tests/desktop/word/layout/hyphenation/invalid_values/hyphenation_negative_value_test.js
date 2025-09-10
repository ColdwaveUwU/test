// hyphenation_negative_value_test.js
// Test: Layout → Hyphenation → Negative Value Rejection
// Description: Test that hyphenation dialog properly handles negative values
// EXPECTED BEHAVIOR: System should reject negative values or handle them gracefully

const { TestData, Hyphenation, FileMenu, Verification } = require("lib");

console.log("Starting negative hyphenation values test");

Tester.createFile("docx");
Tester.input(TestData.LOREM_IPSUM());

// Test negative values in hyphenation dialog
const testValues = {
    automaticallyHyphenate: true,
    hyphenateWordsInCaps: false,
    hyphenationZone: { value: -5.5 },
    limitConsecutiveHyphens: { value: -3 },
};
Hyphenation.setHyphenationSettings(testValues);

// Download document for XML verification
FileMenu.downloadAs("docx");

// Open document for verification
Verification.openFile();

Verification.check("word/settings.xml", "boolean(//w:consecutiveHyphenLimit)", true);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}
Tester.close();
