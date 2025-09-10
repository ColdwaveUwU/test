// test case for setting the top margin of a table in a document
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(1, 2);
Table.setTableAdvancedSettings({
    table: {
        cellMargins: { top: { value: 5 } },
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:top[1]/@w:w", "7200");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
Tester.close();
