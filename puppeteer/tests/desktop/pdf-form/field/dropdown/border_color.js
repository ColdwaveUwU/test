// border color Dropdown field in PDF-form
const { Dropdown, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert dropdown into pdf file
Dropdown.insertDropdown();

// set border color
Dropdown.setColor({
    border: { colorIndex: 27, noBorder: false },
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();

Verification.check("word/document.xml", "//w:border[1]/@w:color", "d9adc7");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
