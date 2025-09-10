// Test for inserting a ComboBox into a PDF file and verifying its functionality
const { ComboBox, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert ComboBox into pdf file
ComboBox.insertComboBox();

// set default fields settings
ComboBox.setFields({
    key: "Combobox1",
});
// add value option
ComboBox.setValueOptions({ value: "test" });
// add value option with index 1
ComboBox.setValueOptions({ value: "test1" });
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");
// insert inline ComboBox
ComboBox.insertComboBox();
// set default fields settings
ComboBox.setFields({
    key: "Combobox1",
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:p[2]/w:sdt[1]/w:sdtPr[1]/w:comboBox[1]/w:listItem[1]/@w:value", "test");
Verification.check("word/document.xml", "//w:p[2]/w:sdt[1]/w:sdtPr[1]/w:comboBox[1]/w:listItem[2]/@w:value", "test1");

let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
