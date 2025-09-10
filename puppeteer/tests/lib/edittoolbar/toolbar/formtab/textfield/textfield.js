const { TextField, Color } = require("lib");
Tester.createFile("pdf");

// insert inline textfield
TextField.insertInlineTextField();
// insert fixed textfield
TextField.insertFixedTextField();

// set Anyone role
TextField.setRole("Anyone");
// set fields
TextField.setFields({
    key: "Test Key",
    placeholder: "Fixed",
    tag: "Fixed",
    tip: "Fixed",
    defaultValue: "Fixed",
});
// set format
TextField.setFormat("None");
// set format
TextField.setFormat("Digits");
// set format
TextField.setFormat("Letters");
// set format
TextField.setFormat("Arbitrary Mask");
// set arbitrary mask
TextField.setMask("Phone Number (e.g. (123) 456-7890)");
// set arbitrary mask
TextField.setMask("Phone Number (e.g. +447911123456)");
// set arbitrary mask
TextField.setMask("US ZIP Code (e.g. 92663 or 92663-1234)");
// set arbitrary mask
TextField.setMask("US SSN (e.g. 123-45-6789)");
// set arbitrary mask
TextField.setMask("UK Passport number (e.g. 925665416)");
// set arbitrary mask
TextField.setMask("Credit card number (e.g 4111-1111-1111-1111)");
// set format
TextField.setFormat("Regular expression");
// set regular expression
TextField.setRegEx("^[0-9]{3}-[0-9]{2}-[0-9]{4}$");
// set format
TextField.setFormat("None");
// set allowed symbols
TextField.setAllowedSymbols("+_)(*&^%$#@!~`");
// set fixed size
TextField.setFixedSize(true);
// set auto fit
TextField.setAutoFit(true);
// set multiline
TextField.setMultiline(true);
// set char limit
TextField.setCharLimit(true);
// set combo chars
TextField.setComboChars(true);
// set char limit value
TextField.setCharLimitValue({ value: 6 });
// set cell width option
TextField.setCellWidthOption("At least");
// set cell width option
TextField.setCellWidthOption("Auto");
// set cell width option
TextField.setCellWidthOption("Exactly");
// set cell width option
TextField.setCellWidthOption("At least");

// set cell width
TextField.setCellWidthValue({ value: 6 });
// set color & background color
TextField.setColor({
    border: { colorIndex: 3, noBorder: true },
    backgroundColor: { type: Color.Type.Standart, index: 3 },
});
// set required
TextField.setRequired(true);
// click lock button
TextField.lock();
// unlock settings
TextField.lock();
// delete textfield
TextField.delete();
// close test
Tester.close();
