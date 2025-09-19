// Test for inserting a checkbox in a PDF form
const { Checkbox, FileMenu, EditPdf } = require("lib");
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();
Checkbox.insertCheckbox();

FileMenu.downloadAs("pdf");
// close test
Tester.close();
