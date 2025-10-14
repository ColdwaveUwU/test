// Test to set checkbox as required in PDF form
const { Checkbox, FileMenu, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();
// insert checkbox
Checkbox.insertCheckbox();

// set required
Checkbox.setRequired(true);

Tester.keyDown("ControlLeft");
Tester.keyPress("S");
Tester.keyUp("ControlLeft");

FileMenu.downloadAs("pdf");

// close test
Tester.close();
