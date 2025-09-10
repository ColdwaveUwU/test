const { FileMenu, Dropdown, Color, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();

//Insert Dropdown into pdf file
Dropdown.insertDropdown();

// add value option
Dropdown.setValueOptions({ value: "test" });

// add value option
Dropdown.setValueOptions({ value: "test-2" });

// set border & background color
Dropdown.setColor({
    border: { colorIndex: 3, noBorder: true },
    backgroundColor: { type: Color.Type.Standart, index: 3 },
});

// set required
Dropdown.setRequired(true);

// click lock button
Dropdown.lock();

// unlock settings
Dropdown.lock();

FileMenu.downloadAs("pdf");
// close test
Tester.close();
