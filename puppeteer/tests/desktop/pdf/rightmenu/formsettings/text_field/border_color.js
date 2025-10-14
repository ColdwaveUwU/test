// set border color for TextField in PDF
const { TextField, FileMenu, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");
EditPdf.clickEditPdf();

TextField.insertFixedTextField();

// Set color & background color
TextField.setColor({
    border: { noBorder: true },
});

TextField.setColor({
    border: { colorIndex: 5 },
});

FileMenu.downloadAs("pdf");

// close test
Tester.close();
