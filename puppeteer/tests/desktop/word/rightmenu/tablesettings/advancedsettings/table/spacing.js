// test case for table spacing in document
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(1, 2);
Table.setTableAdvancedSettings({
    table: {
        options: { inputSpacing: { value: 5 } },
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:tr[1]/w:trPr[1]/w:tblCellSpacing[1]/@w:w", "607");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
Tester.close();
