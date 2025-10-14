// Test for TextField with Regular Expression format in PDF
const { TextField, FileMenu, EditPdf } = require("lib");

/// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");
EditPdf.clickEditPdf();

TextField.insertFixedTextField();

// Set format
TextField.setFormat("Regular expression");
// Set arbitrary mask
// Set regular expression
// TextField.setRegEx("192.168.1.d{1,3}");          todo

FileMenu.downloadAs("pdf");

// close test
Tester.close();
