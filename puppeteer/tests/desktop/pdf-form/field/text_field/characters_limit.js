// set charters limit for TextField in PDF-form

const { TextField, Color, FileMenu, Font, TextForm, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert fixed TextField into pdf file
TextField.insertFixedTextField();

// Set char limit
TextField.setCharLimit(true);

TextField.setCharLimitValue({ value: 3 });

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check(
    "word/document.xml",
    "//wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:sdt[1]/w:sdtPr[1]/w:textFormPr[1]/w:maxCharacters/@w:val",
    "3"
);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
