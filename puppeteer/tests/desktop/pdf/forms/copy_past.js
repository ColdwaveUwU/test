// https://bugzilla.onlyoffice.com/show_bug.cgi?id=76617
const { TextField, FileMenu, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");
EditPdf.clickEditPdf();
Tester.keyPress("Tab");
TextField.insertFixedTextField();
// Set default fields settings
TextField.setFields({
    placeholder: "TextField",
});
// Copy paste the text field
Tester.keyDown("ControlLeft");
Tester.keyPress("C");
Tester.keyUp("ControlLeft");
Tester.keyDown("ControlLeft");
Tester.keyPress("V");
Tester.keyUp("ControlLeft");
FileMenu.downloadAs("pdf");
// close test
Tester.close();