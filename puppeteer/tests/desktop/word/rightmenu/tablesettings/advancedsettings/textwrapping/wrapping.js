// Test for text wrapping settings in table properties
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(3, 4);
Table.setTableAdvancedSettings({
    textWrapping: {
        wrappingStyle: "parallel",
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:tblpPr[1]/@w:horzAnchor", "margin");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

Table.setTableAdvancedSettings({
    textWrapping: {
        wrappingStyle: "none",
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "count(//w:tblpPr[1])", 0);
isSuccess = Verification.isSuccess();
console.log(isSuccess);
Tester.close();
