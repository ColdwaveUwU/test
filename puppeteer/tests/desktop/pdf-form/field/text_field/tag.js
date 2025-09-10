// set tag for text field in pdf-editor
const { TextField, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

// Inserts inline text field in pdf-editor
TextField.insertInlineTextField();

// Set default fields settings
TextField.setFields({
    tag: "TextField-tag",
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:tag[1]/@w:val", "TextField-tag");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
