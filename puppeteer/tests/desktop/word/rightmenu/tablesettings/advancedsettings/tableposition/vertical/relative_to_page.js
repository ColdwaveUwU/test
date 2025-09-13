// Test for table vertical relative to page settings in table properties
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(3, 4);
Table.setTableAdvancedSettings({
    textWrapping: {
        wrappingStyle: "parallel",
    },
    tablePosition: {
        vertical: { alignment: { relative: "Page" } },
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:tblpPr[1]/@w:vertAnchor", "page");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

Tester.close();
