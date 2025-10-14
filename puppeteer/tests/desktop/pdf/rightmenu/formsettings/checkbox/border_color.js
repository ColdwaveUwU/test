// Test case for setting the border color of a checkbox in a PDF form
const { Checkbox, Color, FileMenu, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();
// insert checkbox
Checkbox.insertCheckbox();
// set color
Checkbox.setColor({
    border: { colorIndex: 3, noBorder: false },
});
Tester.keyDown("ControlLeft");
Tester.keyPress("S");
Tester.keyUp("ControlLeft");

FileMenu.downloadAs("pdf");

// close test
Tester.close();
