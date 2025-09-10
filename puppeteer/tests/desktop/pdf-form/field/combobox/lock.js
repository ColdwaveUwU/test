// Test for locking a ComboBox in a PDF form
const { ComboBox, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert ComboBox into pdf file
ComboBox.insertComboBox();

// click lock button
ComboBox.lock();

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:lock[1]/@w:val", "sdtLocked");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
