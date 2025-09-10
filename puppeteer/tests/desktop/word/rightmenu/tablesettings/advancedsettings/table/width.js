// test case for setting the width of a table in a document
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(3, 2);
Table.setTableAdvancedSettings({
    table: {
        tableSize: { width: { value: 5 } },
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:tblW[1]/@w:w", "7200");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
Tester.close();
