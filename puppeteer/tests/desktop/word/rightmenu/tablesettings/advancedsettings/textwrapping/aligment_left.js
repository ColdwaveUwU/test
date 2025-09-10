// test: advanced settings for text wrapping in table with left alignment
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(3, 4);
Table.setTableAdvancedSettings({
    textWrapping: {
        alignment: { alignment: "left", indent: { value: 2 } },
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:tblInd[1]/@w:w", "2880");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
Tester.close();
