// Test for ComboBox tag in PDF form
const { ComboBox, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert ComboBox into pdf file
ComboBox.insertComboBox();

// set default fields settings
ComboBox.setFields({
    tag: "Combobox-tag",
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:body[1]/w:p[1]/w:sdt[1]/w:sdtPr[1]/w:tag[1]/@w:val", "Combobox-tag");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
