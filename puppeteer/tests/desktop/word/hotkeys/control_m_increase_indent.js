/**
 * Test: Creates a new Word document, increases the paragraph indent
 * using the Ctrl+M keyboard shortcut, downloads the file,
 * and verifies that the XML contains the expected left indent.
 */
const { FileMenu, Verification } = require("lib");

// Create a new Word document
Tester.createFile("docx");

// Type sample text
Tester.input("Test indent Ctrl+M");

// Simulate Ctrl + M to increase indent
Tester.keyDown("Control");    // Press Ctrl
Tester.keyPress("m");         // Press M
Tester.keyUp("Control");      // Release Ctrl

// Save the document
FileMenu.downloadAs("docx");

// Open the saved document for verification
Verification.openFile();

// Check that the left indent was applied (709 twips ≈ 0.5 inch)
Verification.check("word/document.xml", "//w:p[1]/w:pPr[1]/w:ind[1]/@w:left", "709");

// Print verification result
console.log(Verification.isSuccess());

// Close the test
Tester.close();
