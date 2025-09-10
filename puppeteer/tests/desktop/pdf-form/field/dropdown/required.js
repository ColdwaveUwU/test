// set required for Dropdown field in PDF-form
const { Dropdown, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert dropdown into pdf file
Dropdown.insertDropdown();

// set required
Dropdown.setRequired(true);

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:formPr[1]/@w:required", "1");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
