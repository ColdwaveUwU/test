// set tag for Dropdown field in PDF-form
const { Dropdown, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert dropdown into pdf file
Dropdown.insertDropdown();

Dropdown.setFields({
    tag: "Dropdown-tag",
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:body[1]/w:p[1]/w:sdt[1]/w:sdtPr[1]/w:tag[1]/@w:val", "Dropdown-tag");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
