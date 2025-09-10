/**
 * Test: Creates a new PowerPoint presentation, moves focus to Slide subtitle,
 * increases the paragraph indent twice, decreases it once,
 * downloads the file, and verifies the decreased indent in XML.
 */
const { FileMenu, Verification, TextForm } = require("lib");

// Create a new presentation
Tester.createFile("pptx");

// Press Tab twice to focus Slide subtitle
Tester.keyPress("Tab");
Tester.keyPress("Tab");

// Type sample text into Slide subtitle
Tester.input("Decrease indent in subtitle");

// Increase indent twice
TextForm.clickIncIndent();
TextForm.clickIncIndent();

// Decrease indent once
TextForm.clickDecIndent();

// Save the presentation
FileMenu.downloadAs("pptx");

// Open the saved file for verification
Verification.openFile();

// Verify that the indent level is 1 after decrease
Verification.check("ppt/slides/slide1.xml", "//a:p[1]/a:pPr/@lvl", "1");

console.log(Verification.isSuccess());
Tester.close();
