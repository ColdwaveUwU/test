// set required for TextField in PDF
const { TextField, FileMenu, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");
EditPdf.clickEditPdf();

// Inserts text field in pdf-editor
TextField.insertFixedTextField();
// Sets the required state of the textfield
TextField.setRequired(true);

FileMenu.downloadAs("pdf");

// close test
Tester.close();
