// Test for table horizontal to the right of page settings in table properties
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(3, 4);
Table.setTableAdvancedSettings({
    textWrapping: {
        wrappingStyle: "parallel",
    },
    tablePosition: {
        horizontal: { position: { value: { value: 3 }, rightOf: "Page" } },
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:tblpPr[1]/@w:horzAnchor", "page");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

Tester.close();
