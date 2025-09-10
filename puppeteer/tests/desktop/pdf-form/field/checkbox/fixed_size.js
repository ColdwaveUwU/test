const { Checkbox, FileMenu, Verification } = require("lib");

Tester.createFile("pdf");
// insert inline checkbox
Checkbox.insertCheckbox();

Checkbox.setFixedSize(true);

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check(
    "word/document.xml",
    "//wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:sdt[1]/w:sdtContent[1]/w:r[1]/w:t[1]",
    "☐"
);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// close test
Tester.close();
