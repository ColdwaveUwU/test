// Test for ComboBox value options in PDF form
const { ComboBox, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert ComboBox into pdf file
ComboBox.insertComboBox();
// add value option
ComboBox.setValueOptions({ value: "test" });
// add value option with index 1
ComboBox.setValueOptions({ value: "test1" });
// add value option
ComboBox.setValueOptions({ value: "test2", index: 1 });
// add value option
ComboBox.setValueOptions({ value: "test3" });

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
