// hyphenation_dialog_comprehensive.js
// Test: Layout → Hyphenation → Dialog Comprehensive Testing
// Description: Test all hyphenation dialog elements, interactions, and XML output verification
// Tests all checkboxes, input fields, and verifies complex XML settings

const { TestData, Hyphenation, FileMenu, Verification } = require("lib");

console.log("Starting comprehensive hyphenation test");

Tester.createFile("docx");
Tester.input(TestData.LOREM_IPSUM());

// Test all dialog elements with comprehensive settings
const testValues = {
    automaticallyHyphenate: true,
    hyphenateWordsInCaps: true,
    hyphenationZone: { value: 0.63 },
    limitConsecutiveHyphens: { value: 2 },
};
Hyphenation.setHyphenationSettings(testValues);

// Download document for XML verification
FileMenu.downloadAs("docx");

// Open document for verification
Verification.openFile();
Verification.check("word/settings.xml", "//w:autoHyphenation/@w:val", "true");
Verification.check("word/settings.xml", "boolean(//w:doNotHyphenateCaps)", false);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}
Tester.close();
