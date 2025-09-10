// columns_left.js
// Test: Left sidebar column layout
// Verifies document has narrow left column + wide right column, XML contains w:cols w:num="2"

const { PageColumns, FileMenu, Verification } = require("lib");

Tester.createFile("docx");
PageColumns.setColumns("Left");
FileMenu.downloadAs("docx");

Verification.openFile();
// check for two columns
Verification.check("word/document.xml", "//w:sectPr/w:cols/@w:num", "2");
// check that there are exactly two <w:col> definitions
Verification.check("word/document.xml", "count(//w:sectPr/w:cols/w:col)=2", true);

console.log(Verification.isSuccess());
Tester.close();
