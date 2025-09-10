// Test for inserting a TextField with an arbitrary mask credit-card in a PDF file
const { TextField, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert inline TextField into pdf file
TextField.insertInlineTextField();
// Set format
TextField.setFormat("Arbitrary Mask");
// Set arbitrary mask
TextField.setMask("Credit card number (e.g 4111-1111-1111-1111)");
TextField.setFields({
    defaultValue: "1234-5678-9999-9999",
});

FileMenu.downloadAs("pdf");

// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:format[1]/@w:val", "9999-9999-9999-9999");
Verification.check("word/document.xml", "//w:t[1]/text()[1]", "1234-5678-9999-9999");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
