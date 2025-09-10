// set comb of character Exatly for TextField in PDF-form

const { TextField, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert fixed TextField into pdf file
TextField.insertFixedTextField();

// Set combo chars
TextField.setComboChars(true);

// set cell width option
TextField.setCellWidthOption("Exactly");
// increment cell width
TextField.setCellWidthValue({ upArrow: true, arrowClickCount: 3 });

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:comb[1]/@w:wRule", "exact");
Verification.check("word/document.xml", "//w:comb[1]/@w:width", "734");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
