// Test for text wrapping settings in table properties - right distance
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(3, 4);
Table.setTableAdvancedSettings({
    textWrapping: {
        wrappingStyle: "parallel",
        distance: { right: { value: 7 } },
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:tblpPr[1]/@w:horzAnchor", "margin");
Verification.check("word/document.xml", "//w:tblpPr[1]/@w:rightFromText", "5295");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

Tester.close();