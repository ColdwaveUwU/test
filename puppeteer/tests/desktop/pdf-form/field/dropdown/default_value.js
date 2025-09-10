// add defaultvalue option Dropdown field in PDF-form
const { Dropdown, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert dropdown into pdf file
Dropdown.insertDropdown();

// add value option
Dropdown.setValueOptions({ value: "test", defaultValue: true });

FileMenu.downloadAs("pdf");

// Getting verification results
Verification.openFile();

Verification.check("word/document.xml", "//w:t[1]/text()[1]", "test");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
