/**
 * Test: Creates a new PDF, types text, increases indent twice, decreases indent once,
 * and downloads the PDF.
 */
const { FileMenu, TextForm } = require("lib");

// 1. Create a new PDF document
Tester.createFile("pdf");

// 2. Type sample text
Tester.input("PDF decrease indent test");

// 3. Increase indent twice
TextForm.clickIncIndent();
TextForm.clickIncIndent();

// 4. Decrease indent once
TextForm.clickDecIndent();

// 5. Download the PDF
FileMenu.downloadAs("pdf");

// 6. todo pdf verification

// 7. Close the test
Tester.close();
