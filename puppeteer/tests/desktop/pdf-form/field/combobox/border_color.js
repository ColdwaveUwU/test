// Test for setting border color of ComboBox in PDF form
const { ComboBox, Color, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert ComboBox into pdf file
ComboBox.insertComboBox();

// set border color
ComboBox.setColor({
    border: { colorIndex: 7, noBorder: false },
});
FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:border[1]/@w:color", "a2b2ca");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
