// test the border size 4.5 in a document table
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(2, 3);
Tester.input("Example");

Table.setTableAdvancedSettings({
    table: {
        options: { inputSpacing: { value: 1 } },
    },
    backgroundBorder: {
        border: { size: "6 pt" },
        borderType: "all-table",
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:tr[1]/w:tc[1]/w:tcPr[1]/w:tcBorders[1]/w:top[1]/@w:sz", "48");
Verification.check("word/document.xml", "//w:tr[1]/w:tc[1]/w:tcPr[1]/w:tcBorders[1]/w:left[1]/@w:sz", "48");
Verification.check("word/document.xml", "//w:tr[1]/w:tc[1]/w:tcPr[1]/w:tcBorders[1]/w:bottom[1]/@w:sz", "48");
Verification.check("word/document.xml", "//w:tr[1]/w:tc[1]/w:tcPr[1]/w:tcBorders[1]/w:right[1]/@w:sz", "48");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
Tester.close();
