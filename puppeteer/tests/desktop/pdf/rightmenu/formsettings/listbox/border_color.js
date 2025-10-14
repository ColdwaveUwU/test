// border color Listbox field in PDF-form
const { Dropdown, Color, FileMenu, EditPdf } = require("lib");
// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();
//Insert dropdown into pdf file
Dropdown.insertDropdown();

// set border color
Dropdown.setColor({
    border: { colorIndex: 5, noBorder: false },
});
Tester.keyDown("ControlLeft");
Tester.keyPress("S");
Tester.keyUp("ControlLeft");
FileMenu.downloadAs("pdf");

// close test
Tester.close();
