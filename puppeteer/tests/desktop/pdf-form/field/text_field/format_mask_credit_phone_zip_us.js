// Test for inserting a TextField with an arbitrary mask zip-us in a PDF file
const { TextField, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert inline TextField into pdf file
TextField.insertInlineTextField();
// Set format
TextField.setFormat("Arbitrary Mask");
// Set arbitrary mask
TextField.setMask("US ZIP Code (e.g. 92663 or 92663-1234)");
TextField.setFields({
    defaultValue: "12345-6789",
});

FileMenu.downloadAs("pdf");

// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:format[1]/@w:val", "99999-9999");
Verification.check("word/document.xml", "//w:t[1]/text()[1]", "12345-6789");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
