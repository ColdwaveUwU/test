const { Checkbox, Color } = require("lib");
Tester.createFile("pdf");
// insert inline checkbox
Checkbox.insertCheckbox();

// set Anyone role
Checkbox.setRole("Anyone");

// set fields
Checkbox.setFields({
    key: "Checkbox-key",
    tag: "Checkbox-tag",
    tip: "Checkbox-tip",
});

// set default checkbox
Checkbox.setDefaultCheckbox(true);

// set fixed size
Checkbox.setFixedSize(true);

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

// delete checkbox
Checkbox.delete();

// close test
Tester.close();
