// set value options for Dropdown field in PDF-form
const { Dropdown, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert dropdown into pdf file
Dropdown.insertDropdown();
// add value option
Dropdown.setValueOptions({ value: "test" });
// add value option with index 1
Dropdown.setValueOptions({ value: "test1" });
// add value option
Dropdown.setValueOptions({ value: "test2", index: 1 });
// add value option
Dropdown.setValueOptions({ value: "test3" });

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:listItem[1]/@w:value", "test2");
Verification.check("word/document.xml", "//w:listItem[2]/@w:value", "test");
Verification.check("word/document.xml", "//w:listItem[3]/@w:value", "test1");
Verification.check("word/document.xml", "//w:listItem[4]/@w:value", "test3");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
