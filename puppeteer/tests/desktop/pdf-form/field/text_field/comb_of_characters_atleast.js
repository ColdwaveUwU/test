// set comb of character At least for TextField in PDF-form

const { TextField, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert fixed TextField into pdf file
TextField.insertFixedTextField();

// Set combo chars
TextField.setComboChars(true);

// set cell width option
TextField.setCellWidthOption("At least");
// increment cell width
TextField.setCellWidthValue({ upArrow: true, arrowClickCount: 3 });
TextField.setCellWidthValue({ downArrow: true, arrowClickCount: 5 });
FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:comb[1]/@w:wRule", "atLeast");
Verification.check("word/document.xml", "//w:comb[1]/@w:width", "56");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
