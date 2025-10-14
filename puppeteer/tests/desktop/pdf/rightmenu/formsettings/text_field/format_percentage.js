// Test for inserting TextField with format "Percentage" in PDF and checking the result
const { TextField, FileMenu, EditPdf } = require("lib");

/// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");
EditPdf.clickEditPdf();

TextField.insertFixedTextField();
// Set format
TextField.setFormat("Percentage");
TextField.setFields({
    placeholder: "Percentage",
});

FileMenu.downloadAs("pdf");

// close test
Tester.close();
