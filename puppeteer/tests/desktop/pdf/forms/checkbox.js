const { FileMenu, Checkbox, Color, EditPdf } = require("lib");
Tester.openFile("pdf/script-form.pdf");

EditPdf.clickEditPdf();
Checkbox.insertCheckbox();

// set default checkbox
Checkbox.setDefaultCheckbox(true);

// set color & background color
Checkbox.setColor({
    border: { colorIndex: 3, noBorder: true },
    backgroundColor: { type: Color.Type.Standart, index: 3 },
});

// set required
Checkbox.setRequired(true);

// click lock button
Checkbox.lock();

// unlock settings
Checkbox.lock();

FileMenu.downloadAs("pdf");
// close test
Tester.close();
