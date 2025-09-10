// set placeholder for Dropdown field in PDF-form
const { Dropdown, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert dropdown into pdf file
Dropdown.insertDropdown();

// set default fields settings
Dropdown.setFields({
    placeholder: "Dropdown-placeholder",
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:t[1]/text()[1]", "Dropdown-placeholder");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
