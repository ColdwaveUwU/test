// test the border color in a document table
const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Table.insertTable(2, 3);
Tester.input("Example");
Table.setTableAdvancedSettings({
    backgroundBorder: {
        border: {color: { type: 2, index: 5, subIndex: 6 } },
        borderType: "all",
    },
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:tr[1]/w:tc[1]/w:tcPr[1]/w:tcBorders[1]/w:top[1]/@w:color", "00b050");
Verification.check("word/document.xml", "//w:tr[1]/w:tc[1]/w:tcPr[1]/w:tcBorders[1]/w:left[1]/@w:color", "00b050");
Verification.check("word/document.xml", "//w:tr[1]/w:tc[1]/w:tcPr[1]/w:tcBorders[1]/w:bottom[1]/@w:color", "00b050");
Verification.check("word/document.xml", "//w:tr[1]/w:tc[1]/w:tcPr[1]/w:tcBorders[1]/w:right[1]/@w:color", "00b050");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
Tester.close();