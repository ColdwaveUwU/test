// Test for inserting a dropdown in a PDF form
const { FileMenu, Dropdown, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();

//Insert Dropdown into pdf file
Dropdown.insertDropdown();


FileMenu.downloadAs("pdf");
// close test
Tester.close();
