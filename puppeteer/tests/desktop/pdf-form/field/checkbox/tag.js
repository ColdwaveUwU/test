const { Checkbox, FileMenu, Verification } = require("lib");

Tester.createFile("pdf");
// insert inline checkbox
Checkbox.insertCheckbox();
// set fields
Checkbox.setFields({
    tag: "Checkbox-tag",
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:p[1]/w:sdt[1]/w:sdtPr[1]/w:tag[1]/@w:val", "Checkbox-tag");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// close test
Tester.close();
