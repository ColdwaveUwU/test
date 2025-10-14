// Test for locking a ComboBox in a PDF form
const { ComboBox, FileMenu, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();
//Insert ComboBox into pdf file
ComboBox.insertComboBox();

// click lock button
ComboBox.lock();
const isDisabledColor = Tester.checkSelector("button.btn.btn-color.dropdown-toggle.disabled");
if (!isDisabledColor) {
    throw new Error("The button is active");
}
FileMenu.downloadAs("pdf");

// close test
Tester.close();
