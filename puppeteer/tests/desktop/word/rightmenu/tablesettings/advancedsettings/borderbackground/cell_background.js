// test the cell color in a document table
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(2, 3);
Tester.input("Example");
Table.setTableAdvancedSettings({
    table: {
        options: { inputSpacing: { value: 1 } },
    },
    backgroundBorder: {
        borderType: "inner-none",
        cellColor: { type: 2, index: 4, subIndex: 4 },
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:tblBorders[1]/w:top[1]/@w:color", "000000");
Verification.check("word/document.xml", "//w:tblBorders[1]/w:left[1]/@w:color", "000000");
Verification.check("word/document.xml", "//w:tblBorders[1]/w:bottom[1]/@w:color", "000000");
Verification.check("word/document.xml", "//w:tblBorders[1]/w:right[1]/@w:color", "000000");
Verification.check("word/document.xml", "//w:tr[*]/w:tc[*]/w:tcPr[1]/w:shd[1]/@w:color", "ffff00");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
Tester.close();
