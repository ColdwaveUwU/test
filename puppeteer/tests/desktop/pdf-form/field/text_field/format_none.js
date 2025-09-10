// set format of TextField to "None" in PDF file
const { TextField, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert inline TextField into pdf file
TextField.insertInlineTextField();
// Set format
TextField.setFormat("None");
TextField.setFields({
    defaultValue: "TextField-default",
});
FileMenu.downloadAs("pdf");

// Getting verification results
Verification.openFile();
Verification.check(
    "word/document.xml",
    "//w:p[1]/w:sdt[1]/w:sdtContent[1]/w:r[1]/w:t[1]/text()[1]",
    "TextField-default"
);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
