// hyphenation_custom_options.js
// Test: Layout → Hyphenation → Custom Options

const { TestData, Hyphenation, FileMenu, Verification } = require("lib");

Tester.createFile("docx");
Tester.input(TestData.LOREM_IPSUM());

Hyphenation.openHyphenationWindow();

Hyphenation.setAutomaticallyHyphenate(true);

Hyphenation.clickOkButton();

FileMenu.downloadAs("docx");

Verification.openFile();

Verification.check("word/settings.xml", "boolean(//w:autoHyphenation)", true);
Verification.check("word/settings.xml", "//w:autoHyphenation/@w:val", "true");

console.log(Verification.isSuccess());
Tester.waitAutosave();
Tester.close();
