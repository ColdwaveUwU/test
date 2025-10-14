// Test for ComboBox placeholder in PDF form
const { ComboBox, FileMenu, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();
//Insert ComboBox into pdf file
ComboBox.insertComboBox();
// set default fields settings
ComboBox.setFields({
    placeholder: "Combobox-placeholder",
});

FileMenu.downloadAs("pdf");

// close test
Tester.close();
