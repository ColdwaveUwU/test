const { Dropdown, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert dropdown into pdf file
Dropdown.insertDropdown();

// delete dropdown
Dropdown.delete();

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "count(//w:p[*])", 1);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
