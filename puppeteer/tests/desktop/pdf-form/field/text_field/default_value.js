// set default value for TextField in PDF-form
const { TextField, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

// Inserts inline text field in pdf-editor
TextField.insertInlineTextField();

TextField.setFields({
    defaultValue: "qwerty",
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:p[1]/w:sdt[1]/w:sdtContent[1]/w:r[1]/w:t[1]/text()[1]", "qwerty");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
