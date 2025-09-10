// Test for setting table alignment to center in a document
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(3, 4);

Table.setTableAdvancedSettings({
    textWrapping: {
        alignment: { alignment: "center" },
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:jc[1]/@w:val", "center");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
Tester.close();
