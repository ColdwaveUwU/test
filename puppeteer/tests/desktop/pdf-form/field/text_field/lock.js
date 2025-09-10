// set lock for TextField in PDF-form

const { TextField, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert fixed TextField into pdf file
TextField.insertFixedTextField();
// lock the TextField
TextField.lock();

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:lock[1]/@w:val", "sdtLocked");

let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
