const { Dropdown, Color } = require("lib");

Tester.createFile("pdf");

//Insert Dropdown into pdf file
Dropdown.insertDropdown();

// set Anyone role
Dropdown.setRole("Anyone");

// set default fields settings
Dropdown.setFields({
    key: "Dropdown-key",
    placeholder: "Dropdown-placeholder",
    tag: "Dropdown-tag",
    tip: "Dropdown-tip",
});

// add value option
Dropdown.setValueOptions({ value: "test" });

// add value option with index 1 , fixed size, and set it as default value
Dropdown.setValueOptions({ value: "default-value", index: 1, defaultValue: true }, (fixedSize = true));

// add value option
Dropdown.setValueOptions({ value: "test-2" });

// set border & background color
Dropdown.setColor({
    border: { colorIndex: 3, noBorder: true },
    backgroundColor: { type: Color.Type.Standart, index: 3 },
});

// set required
Dropdown.setRequired(true);

// click lock button
Dropdown.lock();

// unlock settings
Dropdown.lock();

// delete dropdown
Dropdown.delete();

// close test
Tester.close();
