const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(5, 6);
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "count(//w:gridCol[@*]/@w:w)", 5);
Verification.check("word/document.xml", "count(//w:tr[*]/w:tc[1]/w:tcPr[1]/w:tcW[1]/@w:type)", 6);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
Tester.close();
