// Test for inserting a ComboBox with fixed size in a PDF file
const { ComboBox, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert ComboBox into pdf file
ComboBox.insertComboBox();

// add fixed size
ComboBox.setValueOptions({ value: "test3" }, (fixedSize = true));

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check(
    "word/document.xml",
    "//wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:sdt[1]/w:sdtPr[1]/w:comboBox[1]/w:listItem/@w:value",
    "test3"
);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
