// set key for Dropdown field in PDF-form
const { Dropdown, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert dropdown into pdf file
Dropdown.insertDropdown();

// set default fields settings
Dropdown.setFields({
    key: "Dropdown1",
});

// add value option
Dropdown.setValueOptions({ value: "test" });
// add value option with index 1
Dropdown.setValueOptions({ value: "test1" });
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");
// insert inline Dropdown
Dropdown.insertDropdown();
// set default fields settings
Dropdown.setFields({
    key: "Dropdown1",
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check(
    "word/document.xml",
    "//w:p[2]/w:sdt[1]/w:sdtPr[1]/w:dropDownList[1]/w:listItem[1]/@w:value",
    "test"
);
Verification.check(
    "word/document.xml",
    "//w:p[2]/w:sdt[1]/w:sdtPr[1]/w:dropDownList[1]/w:listItem[2]/@w:value",
    "test1"
);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
