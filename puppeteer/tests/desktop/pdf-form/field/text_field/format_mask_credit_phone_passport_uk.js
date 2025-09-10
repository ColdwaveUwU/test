// Test for inserting a TextField with an arbitrary mask passport-uk in a PDF file
const { TextField, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert inline TextField into pdf file
TextField.insertInlineTextField();
// Set format
TextField.setFormat("Arbitrary Mask");
// Set arbitrary mask
TextField.setMask("UK Passport number (e.g. 925665416)");
TextField.setFields({
    defaultValue: "123456789",
});

FileMenu.downloadAs("pdf");

// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:format[1]/@w:val", "999999999");
Verification.check("word/document.xml", "//w:t[1]/text()[1]", "123456789");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
