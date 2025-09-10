/**
 * Test: Creates a new Word document, increases the paragraph indent multiple times,
 * then decreases the indent, downloads the file, and verifies that the XML shows
 * the reduced left indent value.
 */
const { FileMenu, Verification, TextForm } = require("lib");

// Create a new Word document
Tester.createFile("docx");

// Type sample text
Tester.input("Test indent");

// Increase indent 2 times
TextForm.clickIncIndent();
TextForm.clickIncIndent();

// Decrease indent 1 time
TextForm.clickDecIndent();

// Save the document
FileMenu.downloadAs("docx");

// Open the saved document for verification
Verification.openFile();

// Check that the left indent was reduced (example value after decrease ≈ 709 twips)
Verification.check("word/document.xml", "//w:p[1]/w:pPr[1]/w:ind[1]/@w:left", "709");

// Print verification result
console.log(Verification.isSuccess());

// Close the test
Tester.close();
