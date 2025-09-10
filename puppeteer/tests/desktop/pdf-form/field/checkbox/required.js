const { Checkbox, FileMenu, Verification } = require("lib");

Tester.createFile("pdf");
// insert inline checkbox
Checkbox.insertCheckbox();
// set required
Checkbox.setRequired(true);

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:formPr[1]/@w:required", "1");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// close test
Tester.close();
