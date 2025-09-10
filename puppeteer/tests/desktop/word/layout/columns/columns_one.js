// columns_one.js
// Test: Single column layout (default)
// Verifies document is set to one column and XML contains w:cols w:num="1"

const { PageColumns, FileMenu, Verification } = require("lib");

Tester.createFile("docx");
PageColumns.setColumns("One");
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:sectPr/w:cols/@w:num", "1");

console.log(Verification.isSuccess());
Tester.close();
