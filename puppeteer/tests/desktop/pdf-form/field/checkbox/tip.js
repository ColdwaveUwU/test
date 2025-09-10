const { Checkbox, FileMenu, Verification } = require("lib");

Tester.createFile("pdf");
// insert inline checkbox
Checkbox.insertCheckbox();
// set fields
Checkbox.setFields({
    tip: "Checkbox-tip",
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:p[1]/w:sdt[1]/w:sdtPr[1]/w:formPr[1]/@w:helpText", "Checkbox-tip");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// close test
Tester.close();
