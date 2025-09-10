// set lock for Dropdown field in PDF-form
const { Dropdown, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert dropdown into pdf file
Dropdown.insertDropdown();

// click lock button
Dropdown.lock();

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:lock[1]/@w:val", "sdtLocked");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
