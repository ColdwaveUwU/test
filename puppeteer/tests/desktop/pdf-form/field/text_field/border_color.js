// set border color for TextField in PDF-form

const { TextField, Color, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

// Inserts inline text field in pdf-editor
TextField.insertInlineTextField();

// Set color & background color
TextField.setColor({
    border: { noBorder: true },
});

TextField.setColor({
    border: { colorIndex: 5 },
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:border[1]/@w:color", "dbdbdb");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
