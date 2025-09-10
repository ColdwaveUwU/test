// https://bugzilla.onlyoffice.com/show_bug.cgi?id=74639
const { FileMenu, ComboBox, Color, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();

//Insert ComboBox into pdf file
ComboBox.insertComboBox();
// set default fields settings
ComboBox.setFields({
    placeholder: "Combobox-placeholder",
});
// add value option
ComboBox.setValueOptions({ value: "test" });
// add value option with index 1 & fixed size
ComboBox.setValueOptions({ value: "test1" });
// set border & background color
ComboBox.setColor({
    border: { colorIndex: 3, noBorder: true },
    backgroundColor: { type: Color.Type.Standart, index: 3 },
});
// set required
ComboBox.setRequired(true);
// click lock button
ComboBox.lock();
// unlock settings
ComboBox.lock();
FileMenu.downloadAs("pdf");
// close test
Tester.close();
