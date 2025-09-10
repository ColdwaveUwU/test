// set tip for TextField in PDF-form
const { TextField, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

// Inserts inline text field in pdf-editor
TextField.insertInlineTextField();

// Set default fields settings
TextField.setFields({
    tip: "TextField-tip",
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:formPr[1]/@w:helpText", "TextField-tip");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
