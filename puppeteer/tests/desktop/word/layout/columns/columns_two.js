// columns_two.js
// Test: Two column layout
// Verifies document is formatted into two equal columns and XML contains w:cols w:num="2"

const { PageColumns, FileMenu, Verification } = require("lib");

Tester.createFile("docx");
PageColumns.setColumns("Two");
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:sectPr/w:cols/@w:num", "2");

console.log(Verification.isSuccess());
Tester.close();
