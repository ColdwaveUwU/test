// Test for inserting a combo box in a PDF form
const { ComboBox, FileMenu, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();

//Insert ComboBox into pdf file
ComboBox.insertComboBox();

FileMenu.downloadAs("pdf");
// close test
Tester.close();
