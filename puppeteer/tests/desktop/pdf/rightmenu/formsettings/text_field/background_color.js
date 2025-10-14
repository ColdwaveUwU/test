// set background color for TextField in PDF
const { TextField, Color, FileMenu, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");
EditPdf.clickEditPdf();

TextField.insertFixedTextField();

// Set color & background color
TextField.setColor({
    backgroundColor: { type: Color.Type.Standart, index: 3 },
});

FileMenu.downloadAs("pdf");

// close test
Tester.close();
