const { Checkbox, FileMenu, Verification } = require("lib");

Tester.createFile("pdf");
// insert inline checkbox
Checkbox.insertCheckbox();
// click lock button
Checkbox.lock();

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:lock[1]/@w:val", "sdtLocked");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// // close test
Tester.close();
