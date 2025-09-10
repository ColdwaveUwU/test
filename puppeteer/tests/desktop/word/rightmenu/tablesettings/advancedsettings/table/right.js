// test: right menu - table settings - advanced settings - right
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(1, 2);
Table.setTableAdvancedSettings({
    table: {
        cellMargins: { right: { value: 5 } },
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:right[1]/@w:w", "5295");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
Tester.close();
