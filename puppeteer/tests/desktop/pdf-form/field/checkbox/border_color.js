const { Checkbox, Color, FileMenu, Verification } = require("lib");

Tester.createFile("pdf");
// insert inline checkbox
Checkbox.insertCheckbox();
// set color
Checkbox.setColor({
    border: { colorIndex: 19, noBorder: false },
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:border[1]/@w:color", "e5c2f2");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// close test
Tester.close();
