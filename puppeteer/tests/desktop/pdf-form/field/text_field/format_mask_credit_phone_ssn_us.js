// Test for inserting a TextField with an arbitrary mask ssn-us in a PDF file
const { TextField, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert inline TextField into pdf file
TextField.insertInlineTextField();
// Set format
TextField.setFormat("Arbitrary Mask");
// Set arbitrary mask
TextField.setMask("US SSN (e.g. 123-45-6789)");
TextField.setFields({
    defaultValue: "123-45-6789",
});

FileMenu.downloadAs("pdf");

// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:format[1]/@w:val", "999-99-9999");
Verification.check("word/document.xml", "//w:t[1]/text()[1]", "123-45-6789");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
