// set format of inline text field to number in PDF
const { TextField, FileMenu, EditPdf } = require("lib");

/// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");
EditPdf.clickEditPdf();

TextField.insertFixedTextField();
// Set format
TextField.setFormat("Number");

FileMenu.downloadAs("pdf");

// close test
Tester.close();
