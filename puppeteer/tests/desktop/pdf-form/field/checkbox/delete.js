const { Checkbox, FileMenu, Verification } = require("lib");

Tester.createFile("pdf");
// insert inline checkbox
Checkbox.insertCheckbox();
// delete checkbox
Checkbox.delete();

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "count(//w:p[*])", 1);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// close test
Tester.close();
