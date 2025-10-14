// set charters limit for TextField in PDF
const { TextField, FileMenu, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");
EditPdf.clickEditPdf();

// Inserts text field in pdf-editor
TextField.insertFixedTextField();

// Set char limit
TextField.setCharLimit(true);

TextField.setCharLimitValue({ value: 3 });

FileMenu.downloadAs("pdf");

// close test
Tester.close();
