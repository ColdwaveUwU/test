// set required for Listbox field in PDF-form
const { Dropdown, Color, FileMenu, EditPdf } = require("lib");
// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();
//Insert dropdown into pdf file
Dropdown.insertDropdown();

// set required
Dropdown.setRequired(true);

FileMenu.downloadAs("pdf");

// close test
Tester.close();
