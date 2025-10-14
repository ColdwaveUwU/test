// Test for ComboBox value options in PDF form
const { ComboBox, FileMenu, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();
//Insert ComboBox into pdf file
ComboBox.insertComboBox();
// add value option
ComboBox.setValueOptions({ value: "test" });
// add value option with index 1
ComboBox.setValueOptions({ value: "test1" });
// add value option
ComboBox.setValueOptions({ value: "test2", index: 1 });
// add value option
ComboBox.setValueOptions({ value: "test3" });

Tester.keyDown("ControlLeft");
Tester.keyPress("S");
Tester.keyUp("ControlLeft");
FileMenu.downloadAs("pdf");

// close test
Tester.close();
