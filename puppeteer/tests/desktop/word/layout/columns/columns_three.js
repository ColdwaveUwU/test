// Test Layout → Columns → Three
// Expect three equal columns: <w:cols w:num='3'/>

const { PageColumns, FileMenu, Verification } = require("lib");

Tester.createFile("docx");
PageColumns.setColumns("Three");
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:sectPr/w:cols/@w:num", "3");

console.log(Verification.isSuccess());
Tester.close();
