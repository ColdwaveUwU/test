// Test for setting table title in Word document
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(3, 4);
Table.setTableAdvancedSettings({
    alternativeText: {
        title: { value: "test-title" },
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:tblCaption[1]/@w:val", "test-title");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
Tester.close();
