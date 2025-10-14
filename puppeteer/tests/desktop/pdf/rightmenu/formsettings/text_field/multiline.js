// set multiline value for TextField in PDF
const { TextField, FileMenu, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");
EditPdf.clickEditPdf();

// Inserts text field in pdf-editor
TextField.insertFixedTextField();

// Set mulitline for textfield
TextField.setMultiline(true);
FileMenu.downloadAs("pdf");

// close test
Tester.close();
