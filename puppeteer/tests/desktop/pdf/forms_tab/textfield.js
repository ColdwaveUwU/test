// Test for inserting a fixed text field in a PDF form
const { TextField, FileMenu, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");
EditPdf.clickEditPdf();
Tester.keyPress("Tab");
TextField.insertFixedTextField();

FileMenu.downloadAs("pdf");
// close test
Tester.close();