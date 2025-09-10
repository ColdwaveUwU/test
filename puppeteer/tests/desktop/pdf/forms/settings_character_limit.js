//https://bugzilla.onlyoffice.com/show_bug.cgi?id=74264
// https://bugzilla.onlyoffice.com/show_bug.cgi?id=73947

const { TextField, FileMenu, EditPdf, Dropdown } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");
EditPdf.clickEditPdf();
Tester.keyPress("Tab");
TextField.insertFixedTextField();
// Set char limit
TextField.setCharLimit(true);
EditPdf.clickEditPdf();
Tester.keyPress("Tab");
Tester.input("123");

// bug script 73947
EditPdf.clickEditPdf();
Dropdown.insertDropdown();
FileMenu.downloadAs("pdf");
// close test
Tester.close();
