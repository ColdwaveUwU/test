// hyphenation_dialog_edge_cases.js
// Test: Layout → Hyphenation → Dialog Edge Cases Testing
// Description: Test extreme values and edge cases in hyphenation dialog
// Tests minimum/maximum values, disabled states, and special scenarios

const { TestData, Hyphenation, FileMenu, Verification } = require("lib");

console.log("Starting edge cases hyphenation test");

Tester.createFile("docx");
Tester.input(TestData.LOREM_IPSUM());

// Test edge case settings with specific values
const testValues = {
    automaticallyHyphenate: false,
    hyphenateWordsInCaps: true,
    hyphenationZone: { value: 1.25 },
    limitConsecutiveHyphens: { value: 0 },
};
Hyphenation.setHyphenationSettings(testValues);

// Download document for XML verification
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/settings.xml", "boolean(//w:autoHyphenation)", false);
Verification.check("word/settings.xml", "boolean(//w:consecutiveHyphenLimit)", false);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}
Tester.close();
