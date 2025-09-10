const { Checkbox, FileMenu, Verification } = require("lib");

Tester.createFile("pdf");
// insert inline checkbox
Checkbox.insertCheckbox();
// set fields
Checkbox.setFields({
    key: "Checkbox-key",
});
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");

// insert inline checkbox
Checkbox.insertCheckbox();
// set fields
Checkbox.setFields({
    key: "Checkbox-key",
});
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");
// insert inline checkbox
Checkbox.insertCheckbox();
// set fields
Checkbox.setFields({
    key: "Checkbox-key",
});
FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:p[1]/w:sdt[1]/w:sdtPr[1]/w:formPr[1]/@w:key", "Checkbox-key");
Verification.check("word/document.xml", "//w:p[2]/w:sdt[1]/w:sdtPr[1]/w:formPr[1]/@w:key", "Checkbox-key");
Verification.check("word/document.xml", "//w:p[2]/w:sdt[1]/w:sdtPr[1]/w:formPr[1]/@w:key", "Checkbox-key");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// close test
Tester.close();
