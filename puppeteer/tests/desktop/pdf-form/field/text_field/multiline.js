// set multiline value for TextField in PDF-form
const { TextField, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

// Inserts fixed text field in pdf-editor
TextField.insertFixedTextField();

TextField.setFields({
    defaultValue: "qwerty",
});
// Set mulitline for textfield
TextField.setMultiline(true);
FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check(
    "word/document.xml",
    "//wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:sdt[1]/w:sdtPr[1]/w:textFormPr[1]/@w:multiLine",
    "1"
);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
