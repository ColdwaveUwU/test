const { Checkbox, Color, FileMenu, Verification } = require("lib");

Tester.createFile("pdf");
// insert inline checkbox
Checkbox.insertCheckbox();
// set background color
Checkbox.setColor({
    backgroundColor: { type: Color.Type.Standart, index: 8 },
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:shd[1]/@w:color", "4472c4");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// close test
Tester.close();
