// Test for setting background color of ComboBox in PDF form
const { ComboBox, Color, FileMenu, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();

//Insert ComboBox into pdf file
ComboBox.insertComboBox();
// set background color
ComboBox.setColor({
    backgroundColor: { type: Color.Type.Standart, index: 4 },
});
Tester.keyDown("ControlLeft");
Tester.keyPress("S");
Tester.keyUp("ControlLeft");
FileMenu.downloadAs("pdf");

// close test
Tester.close();
