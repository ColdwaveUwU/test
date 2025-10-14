// set format of TextField to "None" in PDF file
const { TextField, FileMenu, EditPdf } = require("lib");

/// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");
EditPdf.clickEditPdf();

TextField.insertFixedTextField();
// Set format
TextField.setFormat("None");

FileMenu.downloadAs("pdf");

// close test
Tester.close();
