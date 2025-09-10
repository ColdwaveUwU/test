// set comb of character Auto for TextField in PDF-form

const { TextField, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert fixed TextField into pdf file
TextField.insertFixedTextField();

// Set combo chars
TextField.setComboChars(true);

// set cell width option
TextField.setCellWidthOption("Auto");

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:comb[1]/@w:wRule", "auto");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
