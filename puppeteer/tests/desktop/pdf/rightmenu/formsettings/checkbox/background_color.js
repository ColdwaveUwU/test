// Test case for setting the background color of a checkbox in a PDF form
const { Checkbox, Color, FileMenu, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();
// insert checkbox
Checkbox.insertCheckbox();
// set background color
Checkbox.setColor({
    backgroundColor: { type: Color.Type.Standart, index: 8 },
});
Tester.keyDown("ControlLeft");
Tester.keyPress("S");
Tester.keyUp("ControlLeft");
FileMenu.downloadAs("pdf");

// close test
Tester.close();
