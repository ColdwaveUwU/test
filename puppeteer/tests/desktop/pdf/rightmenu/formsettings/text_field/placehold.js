// set placeholder for TextField in pdf
const { TextField, FileMenu, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");
EditPdf.clickEditPdf();

// Inserts text field in pdf
TextField.insertFixedTextField();
// Set default fields settings
TextField.setFields({
    placeholder: "TextField1",
});

FileMenu.downloadAs("pdf");

// close test
Tester.close();
