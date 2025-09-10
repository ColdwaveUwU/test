// test case for setting table description in Word document
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(3, 4);
Table.setTableAdvancedSettings({
    alternativeText: {
        description: { value: "test-description" },
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:tblDescription[1]/@w:val", "test-description");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
Tester.close();
