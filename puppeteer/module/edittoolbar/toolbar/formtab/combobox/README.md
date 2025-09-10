# ComboBox

This library interacts with the ComboBox in pdf-editor.

## Table of Contents

-   [**Methods**](#methods)
    -   [`ComboBox.insertComboBox()`](#comboboxinsertcombobox)
    -   [`ComboBox.setRole(role)`](#comboboxsetrolerole)
    -   [`ComboBox.setFields(fileds)`](#comboboxsetfieldsfileds)
    -   [`ComboBox.setValueOptions(valueOption, fixedSize)`](#comboboxsetvalueoptionsvalueoption-fixedsize)
    -   [`ComboBox.setColor(colorOptions)](#comboboxsetcolorcoloroptions)
    -   [`ComboBox.setRequired(required)](#comboboxsetrequiredrequired)
    -   [`ComboBox.lock()`](#comboboxlock)
    -   [`ComboBox.delete()`](#comboboxdelete)
-   [**Example**](#example)

## Methods

### ComboBox.insertComboBox()

```javascript
/**
 * Inserts combobox in pdf-editor
 */
ComboBox.insertComboBox();
```

### ComboBox Settings

This methods using [ComboboxSettings](../../../../rightmenu/basesettings/formatsettings/subsettings/comboboxsettings.js) lib.

#### ComboBox.setRole(role)

```javascript
/**
 * Set role in combobox settings
 * @param {string} role - target role
 */
ComboBox.setRole(role);
```

#### ComboBox.setFields(fileds)

```javascript
/**
 * Sets various fields in the combobox settings.
 * @param {{fieldName: string}} settings - Object containing field values,
 * the field name matches the corresponding field in the settings menu
 */
ComboBox.setFields(fileds);
```

For ComboBobox field name (defaultValue, tip, tag, placeholder or key)

#### ComboBox.setValueOptions(valueOption, fixedSize)

```javascript
/**
 * Sets value options in the combobox.
 * @param {{value: string | undefined, index: number | undefined, defaultValue: boolean | undefined}} valueOption - Object containing value options.
 * @param {boolean} [fixedSize=false] - Whether the value list has a fixed size.
 */
ComboBox.setValueOptions(valueOption, fixedSize);
```

#### ComboBox.setColor(colorOptions)

```javascript
/**
 * Sets color options for the combobox.
 * @param {{border: {colorIndex: number, noBorder: boolean | undefined} | undefined,
 *          backgroundColor: Color | undefined}} colorOptions - Object containing border and background color configurations.
 */
ComboBox.setColor(colorOptions);
```

This method use [Color](../../../../common/color/README.md) object

#### ComboBox.setRequired(required)

```javascript
/**
 * Sets the required state of the combobox.
 * @param {boolean} [isRequired=true] - Whether the field is required.
 */
ComboBox.setRequired(required);
```

#### ComboBox.lock()

```javascript
/**
 * Locks or unlock the combobox settings.
 */
ComboBox.lock();
```

#### ComboBox.delete()

```javascript
/**
 * Deletes the combobox.
 */
ComboBox.delete();
```

## Example

```javascript
const { ComboBox, Color } = require("lib");

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
```
