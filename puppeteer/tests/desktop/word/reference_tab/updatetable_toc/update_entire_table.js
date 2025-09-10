// test script to update entire Table of Contents including text and page numbers in a DOCX file
const { TableOfContents, FileMenu, Verification } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");

// Add text for Level 1 heading
TableOfContents.addText("Level 1");
// Input test data for Level 1
Tester.input("Test 1\n");
// Add text for Level 2 heading
TableOfContents.addText("Level 2");
// Input test data for Level 2
Tester.input("Test 2\n");
// Add text for Level 3 heading
TableOfContents.addText("Level 3");
// Input test data for Level 3
Tester.input("Test 3");

// Go to the beginning and create table of contents
Tester.keyPress("Home");
Tester.keyPress("PageUp");
// Click the Table of Contents button
TableOfContents.clickTableOfContents();

// Add page break to move content to next page
Tester.keyDown("ControlLeft");
Tester.keyPress("Enter");
Tester.keyUp("ControlLeft");

// Navigate to each heading and change the text
for (let i = 0; i < 5; i++) {
    Tester.keyPress("ArrowRight");
}
Tester.input("new ");
Tester.keyPress("ArrowDown");
Tester.keyPress("ArrowLeft");
Tester.input("new ");
Tester.keyPress("ArrowDown");
Tester.keyPress("ArrowLeft");
Tester.input("new ");
// Update entire table of contents (both text and page numbers)
TableOfContents.updateTable("Update entire table");

FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
// Check that the text was updated to new values
Verification.check("word/document.xml", "//w:p[1]/w:hyperlink[1]/w:r[2]/w:t[1]/text()[1]", "Test new 1");
Verification.check("word/document.xml", "//w:p[2]/w:hyperlink[1]/w:r[2]/w:t[1]/text()[1]", "Test new 2");
Verification.check("word/document.xml", "//w:p[3]/w:hyperlink[1]/w:r[2]/w:t[1]/text()[1]", "Test new 3");
// Check that page numbers were updated (should be on page 2)
Verification.check("word/document.xml", "//w:p[*]/w:hyperlink[1]/w:r[5]/w:t[1]", "2");

let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// Close the test file
Tester.close();
