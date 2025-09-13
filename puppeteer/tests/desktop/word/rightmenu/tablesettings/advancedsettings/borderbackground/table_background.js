// test the table color in a document table
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(2, 3);
Tester.input("Example");
Table.setTableAdvancedSettings({
    backgroundBorder: {
        borderType: "all",
        tableBackground: { type: 2, index: 4, subIndex: 7 },
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:tblPr[1]/w:shd[1]/@w:color", "ffff00");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
Tester.close();