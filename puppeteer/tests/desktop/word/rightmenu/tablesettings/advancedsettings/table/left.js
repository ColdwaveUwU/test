// test case for setting left margin in table settings
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(1, 2);
Table.setTableAdvancedSettings({
    table: {
        cellMargins: { left: { value: 5 } },
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:left[1]/@w:w", "5295");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
Tester.close();
