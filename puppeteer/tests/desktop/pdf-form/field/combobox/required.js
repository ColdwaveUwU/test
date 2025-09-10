// Test for ComboBox required field in PDF form
const { ComboBox, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert ComboBox into pdf file
ComboBox.insertComboBox();
// set required
ComboBox.setRequired(true);

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:formPr[1]/@w:required", "1");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
