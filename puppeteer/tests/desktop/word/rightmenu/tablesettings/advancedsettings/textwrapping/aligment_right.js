// Test for setting text alignment to right in a table cell in a document
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(3, 4);
Table.setTableAdvancedSettings({
    textWrapping: {
        alignment: { alignment: "right" },
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:jc[1]/@w:val", "right");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
Tester.close();
