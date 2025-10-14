// Test case for setting a checkbox to be checked by default in a PDF form
const { Checkbox, FileMenu, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();
// insert checkbox
Checkbox.insertCheckbox();

// set default checkbox
Checkbox.setDefaultCheckbox(true);

Tester.keyDown("ControlLeft");
Tester.keyPress("S");
Tester.keyUp("ControlLeft");

FileMenu.downloadAs("pdf");

// close test
Tester.close();
