// test case for disabling text wrapping in a table cell
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(3, 2);
Tester.input("Example");

Table.setTableAdvancedSettings({
    cell: {
        options: { wrapText: false },
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "count(//w:tr[1]/w:tc[1]/w:tcPr[1]/w:noWrap[1])", 1);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
Tester.close();
