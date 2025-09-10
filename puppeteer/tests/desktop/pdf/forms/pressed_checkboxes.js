//https://bugzilla.onlyoffice.com/show_bug.cgi?id=74997
const { FileMenu, Checkbox, EditPdf } = require("lib");
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();
Checkbox.insertCheckbox();

EditPdf.insertPage("Insert blank page before");
Checkbox.insertCheckbox();
// set default checkbox
Checkbox.setDefaultCheckbox(true);

EditPdf.clickEditPdf(false);

Tester.keyDown("Control");
for (let i = 0; i < 4; i++) {
    Tester.keyPress("Z");
}
Tester.keyUp("Control");

Tester.keyDown("Control");
for (let i = 0; i < 4; i++) {
    Tester.keyPress("Y");
}
Tester.keyUp("Control");
FileMenu.downloadAs("pdf");
// close test
Tester.close();
