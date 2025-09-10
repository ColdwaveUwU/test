// Test for deleting a ComboBox field in a PDF document
const { ComboBox, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert ComboBox into pdf file
ComboBox.insertComboBox();
// delete combobox
ComboBox.delete();

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "count(//w:p[*])", 1);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
