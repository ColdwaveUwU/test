// test the width settings of a cell in a document table
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(3, 2);
Tester.input("Example");
Table.setTableAdvancedSettings({
    cell: {
        cellSize: { preffer: { value: 4 } },
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:tr[1]/w:tc[1]/w:tcPr[1]/w:tcW[1]/@w:w", "5760");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
Tester.close();
