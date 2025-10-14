// Test for locking checkbox in PDF file
const { Checkbox, FileMenu, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();
// insert checkbox
Checkbox.insertCheckbox();

// click lock button
Checkbox.lock();
const isDisabledColor = Tester.checkSelector("button.btn.btn-color.dropdown-toggle.disabled");
if (!isDisabledColor) {
    throw new Error("The button is active");
}
FileMenu.downloadAs("pdf");

// close test
Tester.close();
