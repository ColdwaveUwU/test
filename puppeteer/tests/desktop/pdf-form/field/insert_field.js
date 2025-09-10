// https://bugzilla.onlyoffice.com/show_bug.cgi?id=61802
// https://bugzilla.onlyoffice.com/show_bug.cgi?id=62455

const { TextField, Dropdown, ComboBox } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert fixed TextField into pdf file
TextField.insertFixedTextField();
//Insert ComboBox into pdf file
ComboBox.insertComboBox();
//Insert Dropdown into pdf file
Dropdown.insertDropdown();

Tester.close();
