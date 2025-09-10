// https://bugzilla.onlyoffice.com/show_bug.cgi?id=74675
const { FileMenu, Dropdown, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();

//Insert Dropdown into pdf file
Dropdown.insertDropdown();
Tester.keyDown("Control");
Tester.keyPress("Z");
Tester.keyUp("Control");
Tester.keyDown("Control");
Tester.keyPress("Y");
Tester.keyUp("Control");

FileMenu.downloadAs("pdf");
// close test
Tester.close();
