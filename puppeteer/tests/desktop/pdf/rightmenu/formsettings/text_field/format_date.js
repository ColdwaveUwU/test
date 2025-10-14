// Test for inserting a TextField with "Special" format in a PDF
const { TextField, FileMenu, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");
EditPdf.clickEditPdf();

// Inserts text field in pdf-editor
TextField.insertFixedTextField();

// Set format
TextField.setFormat("Date");

FileMenu.downloadAs("pdf");

// close test
Tester.close();
