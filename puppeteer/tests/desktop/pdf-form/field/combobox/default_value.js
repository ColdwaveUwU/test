// Test for setting default value in ComboBox field in PDF form
const { ComboBox, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert ComboBox into pdf file
ComboBox.insertComboBox();

// set default fields settings
ComboBox.setFields({
    defaultValue: "test1",
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:t[1]/text()[1]", "test1");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
