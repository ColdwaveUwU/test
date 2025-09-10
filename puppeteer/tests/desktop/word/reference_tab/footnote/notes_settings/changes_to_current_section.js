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
    numberFormat: "1, 2, 3,...",
    startAt: "5",
    applyChangesTo: "Current section",
};
// Set the settings
Footnote.setNotesSettings(settings, "apply");

FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "count(//w:numStart[@w:val='5'])", 1);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// Close the test file
Tester.close();
