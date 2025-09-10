// Test Layout → Columns → Right
// Expect two columns with a narrower right column
// 1) w:num="2"
// 2) exactly two <w:col> children

const { PageColumns, FileMenu, Verification } = require("lib");

Tester.createFile("docx");
PageColumns.setColumns("Right");
FileMenu.downloadAs("docx");

Verification.openFile();
// check for two columns
Verification.check("word/document.xml", "//w:sectPr/w:cols/@w:num", "2");
// check that there are exactly two <w:col> definitions
Verification.check("word/document.xml", "count(//w:sectPr/w:cols/w:col)=2", true);

console.log(Verification.isSuccess());
Tester.close();
