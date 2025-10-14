// set lock for Listbox field in PDF-form
const { Dropdown, Color, FileMenu, EditPdf } = require("lib");
// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();
//Insert dropdown into pdf file
Dropdown.insertDropdown();

// click lock button
Dropdown.lock();
const isDisabledColor = Tester.checkSelector("button.btn.btn-color.dropdown-toggle.disabled");
if (!isDisabledColor) {
    throw new Error("The button is active");
}
FileMenu.downloadAs("pdf");

// close test
Tester.close();
