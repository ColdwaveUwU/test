// set autoFit value for TextField in PDF-form
const { TextField, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

// Inserts fixed text field in pdf-editor
TextField.insertFixedTextField();

TextField.setFields({
    defaultValue: "qwerty",
});
// set auto fit for TextField in PDF-form
TextField.setAutoFit(true);
FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check(
    "word/document.xml",
    "//wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:sdt[1]/w:sdtPr[1]/w:textFormPr[1]/@w:autoFit",
    "1"
);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
