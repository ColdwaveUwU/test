/**
 * Test: Creates a new Word document, increases the paragraph indent twice,
 * then decreases it once using Ctrl+Shift+M, downloads the file,
 * and verifies that the XML contains the expected left indent.
 */
const { FileMenu, Verification } = require("lib");

// Create a new Word document
Tester.createFile("docx");

// Type sample text
Tester.input("Test decrease indent Ctrl+Shift+M");

// --- Increase indent twice ---
Tester.keyDown("Control");    // Press Ctrl
Tester.keyPress("m");         // 1st increase
Tester.keyPress("m");         // 2nd increase
Tester.keyUp("Control");      // Release Ctrl

// --- Decrease indent once ---
Tester.keyDown("Control");    // Press Ctrl
Tester.keyDown("Shift");      // Press Shift
Tester.keyPress("m");         // Decrease indent
Tester.keyUp("Shift");        // Release Shift
Tester.keyUp("Control");      // Release Ctrl

// Save the document
FileMenu.downloadAs("docx");

// Open the saved document for verification
Verification.openFile();

// Check that the left indent is applied after decrease (≈ 709 twips after 2 increases and 1 decrease)
Verification.check("word/document.xml", "//w:p[1]/w:pPr[1]/w:ind[1]/@w:left", "709");

// Print verification result
console.log(Verification.isSuccess());

// Close the test
Tester.close();
