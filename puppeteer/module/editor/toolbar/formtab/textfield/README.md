# TextField

This library interacts with the TextField in pdf-editor.

## Table of Contents

-   [**Methods**](#methods)
    -   [`TextField.insertFixedTextField()`](#textfieldinsertfixedtextfield)
    -   [`TextField.insertInlineTextField()`](#textfieldinsertinlinetextfield)
    -   [`TextField.setRole(role)`](#textfieldsetrolerole)
    -   [`TextField.setFields(settings)`](#textfieldsetfieldssettings)
    -   [`TextField.setFormat(format)`](#textfieldsetformatformat)
    -   [`TextField.setRegEx(regex)`](#textfieldsetregexregex)
    -   [`TextField.setMask(mask)`](#textfieldsetmaskmask)
    -   [`TextField.setAllowedSymbols(symbols)`](#textfieldsetallowedsymbolssymbols)
    -   [`TextField.setFixedSize(fixedSize)`](#textfieldsetfixedsizefixedsize)
    -   [`TextField.setAutoFit(autoFit)`](#textfieldsetautofitautofit)
    -   [`TextField.setMultiline(multiline)`](#textfieldsetmultilinemultiline)
    -   [`TextField.setCharLimit(charLimit)`](#textfieldsetcharlimitcharlimit)
    -   [`TextField.setComboChars(comboChars)`](#textfieldsetcombocharscombochars)
    -   [`TextField.setCharLimitValue(value)`](#textfieldsetcharlimitvaluevalue)
    -   [`TextField.setCellWidthOption(option)`](#textfieldsetcellwidthoptionoption)
    -   [`TextField.incrementCellWidth(increment)`](#textfieldincrementcellwidthincrement)
    -   [`TextField.decrementCellWidth(decrement)`](#textfieldsetdecrementcellwidthdecrement)
    -   [`TextField.setCellWidthValue(value)`](#textfieldsetcellwidthvaluevalue)
    -   [`TextField.setColor(colorOptions)`](#textfieldsetcolorcoloroptions)
    -   [`TextField.setRequired(required)`](#textfieldsetrequiredrequired)
    -   [`TextField.lock()`](#textfieldlock)
    -   [`TextField.delete()`](#textfielddelete)
-   [**Example**](#example)

## Methods

### TextField.insertFixedTextField();

```javascript
/**
 * Inserts fixed text field in pdf-editor
 */
TextField.insertFixedTextField();
```

### TextField.insertInlineTextField();

```javascript
/**
 * Inserts inline text field in pdf-editor
 */
TextField.insertInlineTextField();
```

### TextField Settings

This methods using [TextFieldSettings](../../../../rightmenu/basesettings/formatsettings/subsettings/textfieldsettings/textfieldsettings.js) lib.

#### TextField.setRole(role)

```javascript
/**
 * Set role in combo box settings
 * @param {string} - target role
 */
TextField.setRole(role);
```

#### TextField.setFields(settings)

```javascript
/**
 * Sets various fields in the textfield settings.
 * @param {{fieldName: string}} settings - Object containing field values,
 * the field name matches the corresponding field in the settings menu
 */
TextFields.setFields(settings);
```

For TextField field name (defaultValue, tip, tag, placeholder or key)

#### TextField.setFormat(format)

```javascript
/**
 * Sets various fields in the textfield settings.
 * @param {string} - Format to be set.
 */
TextField.setFormat(format);
```

Available format options (None, Digits, Letters, Arbitrary Mask, Regular expression)

#### TextField.setMask(mask)

```javascript
/**
 * Sets the arbitrary mask for the text field.
 * @param {string} mask - The mask to be set.
 */
TextField.setMask(mask);
```

Available mask options (Phone Number (e.g. (123) 456-7890), Phone Number (e.g. +447911123456), etc..)

#### TextField.setRegEx(regex)

```javascript
/**
 * Sets the regular expression for the text field.
 * @param {string} regex - The regular expression to be set.
 */
TextField.setRegEx(regex);
```

#### TextField.setAllowedSymbols(symbols)

```javascript
/**
 * Sets the allowed symbols for the text field.
 * @param {string} symbols - The allowed symbols to be set.
 */
TextField.setAllowedSymbols(symbols);
```

#### TextField.setFixedSize(isFixedSize)

```javascript
/**
 * Set the fixed size for thextfield
 * @param {boolean} [isFixedSize=false]
 */
TextField.setFixedSize(isFixedSize);
```

#### TextField.setAutoFit(isAutoFit)

```javascript
/**
 * Set auto fit for textfield
 * @param {boolean} [isAutoFit = false]
 */
TextField.setAutoFit(isAutoFit);
```

#### TextField.setMultiline(isMultiline)

```javascript
/**
 * Set mulitline for textfield
 * @param {boolean} [isMultiline=false]
 */
TextField.setAutoFit(isMultiline);
```

#### TextField.setCharLimit(isCharLimit)

```javascript
/**
 * Set character limit  for textfield
 * @param {boolean} [isCharLimit = false]
 */
TextField.setCharLimit(isCharLimit);
```

#### TextField.setComboChars(isComboChars)

```javascript
/**
 * Set comb of characters for textfield
 * @param {boolean} [isComboChars = false]
 */
TextField.setComboChars(isComboChars);
```

#### TextField.setCharLimitValue(value)

```javascript
/**
 * @typedef {Object} InputSettings
 * @property {boolean} [upArrow] - Indicates if the up arrow button should be clicked.
 * @property {boolean} [downArrow] - Indicates if the down arrow button should be clicked.
 * @property {number} [arrowClickCount] - The number of times to click the arrow buttons.
 * @property {string | number} [value] - The value to set in the input field.
 */
/**
 * Sets char limit value
 * @param {InputSettings} value
 */
TextField.setCharLimitValue(value);
```

#### TextField.setCellWidthOption(option)

```javascript
/**
 * Sets the cell width option for the text field.
 * @param {string} option - The option to be set.
 * Available options: Auto, At least, Exactly
 */
TextField.setCellWidthOption(option);
```

#### TextField.setCellWidthValue(value)

```javascript
/**
 * @typedef {Object} InputSettings
 * @property {boolean} [upArrow] - Indicates if the up arrow button should be clicked.
 * @property {boolean} [downArrow] - Indicates if the down arrow button should be clicked.
 * @property {number} [arrowClickCount] - The number of times to click the arrow buttons.
 * @property {string | number} [value] - The value to set in the input field.
 */
/**
 * Sets cell width value
 * @param {InputSettings} value
 */
TextField.setCellWidthValue(value);
```

#### TextField.setColor(colorOptions)

```javascript
/**
 * Sets color options for the textfield.
 * @param {{border: {colorIndex: number, noBorder: boolean | undefined} | undefined,
 *          backgroundColor: Color | undefined}} colorOptions - Object containing border and background color configurations.
 */
TextField.setColor(colorOptions);
```

This method use [Color](../../../../common/color/README.md) object

#### TextField.setRequired(required)

```javascript
/**
 * Sets the required state of the textfield.
 * @param {boolean} [isRequired=true] - Whether the field is required.
 */
TextField.setRequired(required);
```

#### TextField.lock()

```javascript
/**
 * Locks or unlock the textfield settings.
 */
TextField.lock();
```

#### TextField.delete()

```javascript
/**
 * Deletes the textfield.
 */
TextField.delete();
```

## Example

```javascript
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
```
