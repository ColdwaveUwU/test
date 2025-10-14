// set value options for Listbox field in PDF-form
const { Dropdown, Color, FileMenu, EditPdf } = require("lib");
// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();
//Insert dropdown into pdf file
Dropdown.insertDropdown();
// add value option
Dropdown.setValueOptions({ value: "test" });
// add value option with index 1
Dropdown.setValueOptions({ value: "test1" });
// add value option
Dropdown.setValueOptions({ value: "test2", index: 1 });
// add value option
Dropdown.setValueOptions({ value: "test3" });

FileMenu.downloadAs("pdf");

// close test
Tester.close();
