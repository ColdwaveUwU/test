const { Checkbox, FileMenu, Verification } = require("lib");

Tester.createFile("pdf");
// insert inline checkbox
Checkbox.insertCheckbox();
// set Anyone role
Checkbox.setRole("Anyone");
// set default checkbox
Checkbox.setDefaultCheckbox(true);

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:t[1]/text()[1]", "☑");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// close test
Tester.close();
