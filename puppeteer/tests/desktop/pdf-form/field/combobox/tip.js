// Test for ComboBox tip in PDF form
const { ComboBox, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert ComboBox into pdf file
ComboBox.insertComboBox();

// set Anyone role
ComboBox.setRole("Anyone");
// set default fields settings
ComboBox.setFields({
    tip: "Combobox-tip",
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check(
    "word/document.xml",
    "//w:body[1]/w:p[1]/w:sdt[1]/w:sdtPr[1]/w:formPr[1]/@w:helpText",
    "Combobox-tip"
);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
