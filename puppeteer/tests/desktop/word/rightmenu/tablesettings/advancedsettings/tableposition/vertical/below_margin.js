// Test for table vertical below margin settings in table properties
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(3, 4);
Table.setTableAdvancedSettings({
    textWrapping: {
        wrappingStyle: "parallel",
    },
    tablePosition: {
        vertical: { position: { value: { value: 3 }, below: "Margin" } },
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:tblpPr[1]/@w:vertAnchor", "margin");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

Tester.close();
