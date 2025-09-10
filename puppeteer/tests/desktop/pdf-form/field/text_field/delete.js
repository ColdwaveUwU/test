// set delete for TextField in PDF-form

const { TextField, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

// Inserts inline text field in pdf-editor
TextField.insertInlineTextField();
// delete the TextField
TextField.delete();

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "count(//w:p[*])", 1);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
