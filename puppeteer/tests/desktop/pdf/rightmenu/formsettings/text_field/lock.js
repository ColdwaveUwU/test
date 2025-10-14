// set lock for TextField in PDF
const { TextField, FileMenu, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");
EditPdf.clickEditPdf();

// Inserts text field in pdf-editor
TextField.insertFixedTextField();
// lock the TextField
TextField.lock();
const isDisabledColor = Tester.checkSelector("button.btn.btn-color.dropdown-toggle.disabled");
if (!isDisabledColor) {
    throw new Error("The button is active");
}
FileMenu.downloadAs("pdf");

// close test
Tester.close();
