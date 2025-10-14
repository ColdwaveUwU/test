//  background color Listbox field in PDF-form
const { Dropdown, Color, FileMenu, EditPdf } = require("lib");
// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();

//Insert dropdown into pdf file
Dropdown.insertDropdown();

Dropdown.setColor({
    backgroundColor: {
        type: Color.Type.Custom,
        r: 150,
        g: 55,
        b: 100,
        hex: 0,
    },
});
FileMenu.downloadAs("pdf");

// close test
Tester.close();
