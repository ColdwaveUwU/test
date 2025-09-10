// Test for TextField with Regular Expression format in PDF
const { TextField, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert inline TextField into pdf file
TextField.insertInlineTextField();

// Set format
TextField.setFormat("Regular expression");
// Set arbitrary mask
// Set regular expression
TextField.setRegEx("192.168.1.d{1,3}");
TextField.setFields({
    defaultValue: "192.168.1.255",
});

FileMenu.downloadAs("pdf");

// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:format[1]/@w:val", "192.168.1.d{1,3}");
Verification.check("word/document.xml", "//w:t[1]/text()[1]", "192.168.1.255");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
