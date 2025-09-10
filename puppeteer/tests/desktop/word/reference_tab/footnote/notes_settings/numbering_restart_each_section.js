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
Tester.input("Insert endnote text with number i in Test2");
const settings = {
    numbering: "Restart each section",
};
// Set the settings
Footnote.setNotesSettings(settings, "apply");
for (let i = 0; i < 2; i++) {
    Tester.keyPress("PageUp");
}
Footnote.insertEndnote();
Tester.input("Insert endnote text with number i");
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:rStyle[1]/@w:val", "186");
Verification.check("word/document.xml", "//w:numRestart[1]/@w:val", "eachSect");
Verification.check("word/document.xml", "//w:numStart[1]/@w:val", "1");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// Close the test file
Tester.close();
