// Test for ComboBox placeholder in PDF form
const { ComboBox, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert ComboBox into pdf file
ComboBox.insertComboBox();
// set default fields settings
ComboBox.setFields({
    placeholder: "Combobox-placeholder",
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:t[1]/text()[1]", "Combobox-placeholder");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
