// https://bugzilla.onlyoffice.com/show_bug.cgi?id=75245

const { TextField, ComboBox, Dropdown, Checkbox, FileMenu, Verification } = require("lib");
// Open the PDF file for testing
Tester.createFile("pdf");

//Insert inline TextField into pdf file
TextField.insertInlineTextField();

// Set default fields settings
TextField.setFields({
    key: "TextFieldKey",
});

// Set required
TextField.setRequired(true);
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");

//Insert inline TextField into pdf file
TextField.insertInlineTextField();
// Set default fields settings
TextField.setFields({
    key: "TextFieldKey",
});
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");
//Insert inline TextField into pdf file
TextField.insertFixedTextField();
// Set fixed size
TextField.setFixedSize(true);
// Set default fields settings
TextField.setFields({
    key: "TextFieldKey",
});

for (let i = 0; i < 50; i++) {
    Tester.keyPress("ArrowDown");
}

//Insert ComboBox into pdf file
ComboBox.insertComboBox();
// set default fields settings
ComboBox.setFields({
    key: "ComboboxKey",
});
// set required
ComboBox.setRequired(true);
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");

//Insert ComboBox into pdf file
ComboBox.insertComboBox();
// set default fields settings
ComboBox.setFields({
    key: "ComboboxKey",
});
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");
//Insert ComboBox into pdf file
ComboBox.insertComboBox();
// set default fields settings
ComboBox.setFields({
    key: "ComboboxKey",
});
// add fixed size
ComboBox.setValueOptions({ value: "testComboBox" }, (fixedSize = true));
for (let i = 0; i < 50; i++) {
    Tester.keyPress("ArrowDown");
}
//Insert Dropdown into pdf file
Dropdown.insertDropdown();
// set default fields settings
Dropdown.setFields({
    key: "DropdownKey",
});
// set required
Dropdown.setRequired(true);
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");
//Insert Dropdown into pdf file
Dropdown.insertDropdown();
// set default fields settings
Dropdown.setFields({
    key: "DropdownKey",
});
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");
//Insert Dropdown into pdf file
Dropdown.insertDropdown();
// set default fields settings
Dropdown.setFields({
    key: "DropdownKey",
});
// add fixed size
Dropdown.setValueOptions({ value: "testDropDown" }, (fixedSize = true));
for (let i = 0; i < 50; i++) {
    Tester.keyPress("ArrowDown");
}
//Insert Checkbox into pdf file
Checkbox.insertCheckbox();
// set default fields settings
Checkbox.setFields({
    key: "CheckboxKey",
});
// set required
Checkbox.setRequired(true);
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");
//Insert Checkbox into pdf file
Checkbox.insertCheckbox();
// set default fields settings
Checkbox.setFields({
    key: "CheckboxKey",
});
Tester.keyPress("ArrowRight");
for (let i = 0; i < 2; i++) {
    Tester.keyPress("Enter");
}
//Insert Checkbox into pdf file
Checkbox.insertCheckbox();
// add fixed size
Checkbox.setFixedSize(true);
// set default fields settings
Checkbox.setFields({
    key: "CheckboxKey",
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "count(//w:p[*]/w:sdt[1]/w:sdtPr[1]/w:formPr[1]/@w:required)", 16);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
