// set fixed for TextField in PDF-form
const { TextField, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

// Inserts inline text field in pdf-editor
TextField.insertInlineTextField();
// Set default fields settings
TextField.setFields({
    placeholder: "TextField",
});
TextField.setFixedSize((fixedSize = true));

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check(
    "word/document.xml",
    "//wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:sdt[1]/w:sdtContent[1]/w:r[1]/w:t",
    "TextField"
);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
