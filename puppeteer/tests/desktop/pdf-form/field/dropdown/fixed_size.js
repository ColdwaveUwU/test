// set fixed size for Dropdown field in PDF-form
const { Dropdown, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert dropdown into pdf file
Dropdown.insertDropdown();

// add fixed size
Dropdown.setValueOptions({ value: "test" }, (fixedSize = true));

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check(
    "word/document.xml",
    "//wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:sdt[1]/w:sdtPr[1]/w:dropDownList[1]/w:listItem[1]/@w:value",
    "test"
);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
