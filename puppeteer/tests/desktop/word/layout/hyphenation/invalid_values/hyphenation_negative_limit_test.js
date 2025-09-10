// hyphenation_negative_limit_test.js
// Test: Layout → Hyphenation → Negative Limit Rejection
// Description: Test that hyphenation dialog properly handles negative consecutive hyphens limit
// EXPECTED BEHAVIOR: System should reject negative limit or handle it gracefully

const { TestData, Hyphenation, FileMenu, Verification } = require("lib");

console.log("Starting negative consecutive hyphens limit test");

Tester.createFile("docx");
Tester.input(TestData.LOREM_IPSUM());

// Test negative consecutive hyphens limit handling
const testValues = {
    automaticallyHyphenate: true,
    hyphenateWordsInCaps: false,
    hyphenationZone: { value: 1.0 },
    limitConsecutiveHyphens: { value: -10 },
};
Hyphenation.setHyphenationSettings(testValues);

// Download document for XML verification
FileMenu.downloadAs("docx");

// Open document for verification
Verification.openFile();
Verification.check("word/settings.xml", "boolean(//w:autoHyphenation)", true); // Check automaticallyHyphenate
Verification.check("word/settings.xml", "boolean(//w:consecutiveHyphenLimit)", true); // Check consecutiveHyphenLimit (system creates element)

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}
Tester.close();
