const { ComboBox, Color, ComboBoxSettings } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert ComboBox into pdf file
ComboBox.insertComboBox();

// set Anyone role
ComboBox.setRole("Anyone");

// set default fields settings
ComboBox.setFields({
    key: "Combobox-key",
    placeholder: "Combobox-placeholder",
    tag: "Combobox-tag",
    tip: "Combobox-tip",
    defaultValue: "Combobox-default",
});
// add value option
ComboBox.setValueOptions({ value: "test" });
// add value option with index 1 & fixed size
ComboBox.setValueOptions({ value: "test1", index: 1 }, (fixedSize = true));
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
// delete combobox
ComboBox.delete();
// close test
Tester.close();
