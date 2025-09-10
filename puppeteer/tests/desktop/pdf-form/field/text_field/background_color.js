// set background color for TextField in PDF-form
const { TextField, Color, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

// Inserts inline text field in pdf-editor
TextField.insertInlineTextField();

// Set color & background color
TextField.setColor({
    backgroundColor: { type: Color.Type.Standart, index: 3 },
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();

Verification.check("word/document.xml", "//w:shd[1]/@w:color", "44546a");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
