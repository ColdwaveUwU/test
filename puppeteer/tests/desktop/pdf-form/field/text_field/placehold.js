// set placeholder for TextField in pdf-editor
const { TextField, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert fixed TextField into pdf file
TextField.insertFixedTextField();
// Set default fields settings
TextField.setFields({
    placeholder: "TextField1",
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check(
    "word/document.xml",
    "//wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:sdt[1]/w:sdtContent[1]/w:r[1]",
    "TextField1"
);

let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
