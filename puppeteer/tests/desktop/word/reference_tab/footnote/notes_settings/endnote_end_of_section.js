// The test insert endnotes at the end of each section in a DOCX file
const { Footnote, PageBreakLayout, FileMenu, Verification } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");
Tester.input("Test 1");
// Insert a page break to create a new section
PageBreakLayout.insertPageBreakWithOptions({ section: { nextPage: true } });
Tester.input("Test 2");
// Insert a page break to create a new section
PageBreakLayout.insertPageBreakWithOptions({ section: { nextPage: true } });
Tester.input("Test 3");
Tester.keyPress("PageUp");
// Insert a endnote
Footnote.insertEndnote();
Tester.input("Insert endnote text with number 1");
const settings = {
    location: "End of section",
};
// Set the settings
Footnote.setNotesSettings(settings, "apply");

FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:rStyle[1]/@w:val", "186");
Verification.check("word/settings.xml", "//w:endnotePr[1]/w:pos[1]/@w:val", "sectEnd");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// Close the test file
Tester.close();
