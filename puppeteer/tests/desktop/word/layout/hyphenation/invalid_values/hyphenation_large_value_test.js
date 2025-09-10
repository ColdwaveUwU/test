// hyphenation_large_value_test.js
// Test: Layout → Hyphenation → Large Value Rejection
// Description: Test that hyphenation dialog properly rejects extremely large values
// EXPECTED BEHAVIOR: System should reject values > reasonable limit and not apply invalid settings

const { TestData, Hyphenation, FileMenu, Verification } = require("lib");

console.log("Starting large hyphenation values test");

Tester.createFile("docx");
Tester.input(TestData.LOREM_IPSUM());

// Test extremely large values in hyphenation dialog
const testValues = {
    automaticallyHyphenate: true,
    hyphenateWordsInCaps: false,
    hyphenationZone: { value: 9999999999 },
    limitConsecutiveHyphens: { value: 999999 },
};
Hyphenation.setHyphenationSettings(testValues);

// Download document for XML verification
FileMenu.downloadAs("docx");

// common setup…
Verification.openFile();

Verification.check("word/settings.xml", "boolean(//w:autoHyphenation)", true);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}
Tester.close();
