/**
 * Test: Creates a new PDF, types text, increases indent, and downloads the PDF.
 */
const { FileMenu, TextForm } = require("lib");

// 1. Create a new PDF document
Tester.createFile("pdf");

// 2. Type sample text
Tester.input("PDF increase indent test");

// 3. Click Increase Indent
TextForm.clickIncIndent();

// 4. Download the PDF
FileMenu.downloadAs("pdf");

// 5. todo pdf verification

// 6. Close the test
Tester.close();
