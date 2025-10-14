// Test for setting border color of ComboBox in PDF form
const { ComboBox, Color, FileMenu, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();
//Insert ComboBox into pdf file
ComboBox.insertComboBox();

// set border color
ComboBox.setColor({
    border: { colorIndex: 7, noBorder: false },
});
FileMenu.downloadAs("pdf");

// close test
Tester.close();
