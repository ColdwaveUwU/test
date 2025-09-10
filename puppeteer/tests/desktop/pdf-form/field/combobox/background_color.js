// Test for setting background color of ComboBox in PDF form
const { ComboBox, Color, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert ComboBox into pdf file
ComboBox.insertComboBox();
// set background color
ComboBox.setColor({
    backgroundColor: { type: Color.Type.Standart, index: 4 },
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:formPr[1]/w:shd[1]/@w:color", "5b9bd5");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
