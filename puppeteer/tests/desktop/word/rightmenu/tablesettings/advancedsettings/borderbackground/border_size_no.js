// test the border size 0 in a document table
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(2, 3);
Tester.input("Example");

Table.setTableAdvancedSettings({
    table: {
        options: { inputSpacing: { value: 1 } },
    },
    backgroundBorder: {
        border: { size: "No borders" },
        borderType: "all-table",
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:tblBorders[1]/w:top[1]/@w:val", "nil");
Verification.check("word/document.xml", "//w:tblBorders[1]/w:left[1]/@w:val", "nil");
Verification.check("word/document.xml", "//w:tblBorders[1]/w:bottom[1]/@w:val", "nil");
Verification.check("word/document.xml", "//w:tblBorders[1]/w:right[1]/@w:val", "nil");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
Tester.close();
