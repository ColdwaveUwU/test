/**
 * Test: Creates a new PowerPoint presentation, moves focus to Slide subtitle,
 * increases the paragraph indent, downloads the file,
 * and verifies that the slide XML reflects the indent change.
 */
const { FileMenu, Verification, TextForm } = require("lib");

// Create a new presentation
Tester.createFile("pptx");

// Press Tab twice to move focus from Slide title to Slide subtitle
Tester.keyPress("Tab");
Tester.keyPress("Tab");

// Type sample text into Slide subtitle
Tester.input("Increase indent in subtitle");

// Increase indent
TextForm.clickIncIndent();

// Save the presentation
FileMenu.downloadAs("pptx");

// Open the saved file for verification
Verification.openFile();

// Verify that the first paragraph in slide1.xml has indent level 1
Verification.check("ppt/slides/slide1.xml", "//a:p[1]/a:pPr/@lvl", "1");

console.log(Verification.isSuccess());
Tester.close();
