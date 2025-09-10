// hyphenation_none.js
// Test: Layout → Hyphenation → None

const { TestData, Hyphenation, FileMenu, Verification } = require("lib");

Tester.createFile("docx");
Tester.input(TestData.LOREM_IPSUM());

Hyphenation.setHyphenation("None");

FileMenu.downloadAs("docx");

Verification.openFile();

Verification.check("word/settings.xml", "boolean(//w:autoHyphenation)", false);

console.log(Verification.isSuccess());
Tester.waitAutosave();
Tester.close();
