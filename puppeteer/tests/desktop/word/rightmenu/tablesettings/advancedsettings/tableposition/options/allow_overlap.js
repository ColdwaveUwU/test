// Test for table position allow overlap option in table properties
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(3, 4);
Table.setTableAdvancedSettings({
    textWrapping: {
        wrappingStyle: "parallel",
    },
    tablePosition: {
        options: { overlap: false },
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:tblOverlap[1]/@w:val", "never");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

Table.setTableAdvancedSettings({
    textWrapping: {
        wrappingStyle: "parallel",
    },
    tablePosition: {
        options: { overlap: true },
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "count(//w:tblOverlap[1]/@w:val)", 0);
isSuccess = Verification.isSuccess();
console.log(isSuccess);

Tester.close();
