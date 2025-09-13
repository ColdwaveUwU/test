// Test for text wrapping settings in table properties - bottom distance
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(3, 4);
Table.setTableAdvancedSettings({
    textWrapping: {
        wrappingStyle: "parallel",
        distance: { bottom: { value: 7 } },
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:tblpPr[1]/@w:horzAnchor", "margin");
Verification.check("word/document.xml", "//w:tblpPr[1]/@w:bottomFromText", "10080");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

Tester.close();