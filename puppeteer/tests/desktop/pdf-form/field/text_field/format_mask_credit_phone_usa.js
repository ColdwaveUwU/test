// Test for inserting a TextField with an arbitrary mask phone-usa in a PDF file
const { TextField, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert inline TextField into pdf file
TextField.insertInlineTextField();
// Set format
TextField.setFormat("Arbitrary Mask");
// Set arbitrary mask
TextField.setMask("Phone Number (e.g. (123) 456-7890)");
TextField.setFields({
    defaultValue: "(123)456-7899",
});

FileMenu.downloadAs("pdf");

// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:format[1]/@w:val", "(999)999-9999");
Verification.check("word/document.xml", "//w:t[1]/text()[1]", "(123)456-7899");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
