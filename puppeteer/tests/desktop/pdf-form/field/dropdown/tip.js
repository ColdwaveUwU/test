// set tip for Dropdown field in PDF-form
const { Dropdown, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert dropdown into pdf file
Dropdown.insertDropdown();

// set default fields settings
Dropdown.setFields({
    tip: "Dropdown-tip",
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check(
    "word/document.xml",
    "//w:body[1]/w:p[1]/w:sdt[1]/w:sdtPr[1]/w:formPr[1]/@w:helpText",
    "Dropdown-tip"
);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
