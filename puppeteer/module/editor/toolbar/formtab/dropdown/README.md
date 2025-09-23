# Dropdown

This library interacts with the Dropdown in pdf-editor.

## Table of Contents

-   [**Methods**](#methods)
    -   [`Dropdown.insertDropdown()`](#dropdowninsertDropdown)
    -   [`Dropdown.setRole(role)`](#dropdownsetrolerole)
    -   [`Dropdown.setFields(fileds)`](#dropdownsetfieldsfileds)
    -   [`Dropdown.setValueOptions(valueOption, fixedSize)`](#dropdownsetvalueoptionsvalueoption-fixedsize)
    -   [`Dropdown.setColor(colorOptions)`](#dropdownsetcolorcoloroptions)
    -   [`Dropdown.setRequired(required)`](#dropdownsetrequiredrequired)
    -   [`Dropdown.lock()`](#dropdownlock)
    -   [`Dropdown.delete()`](#dropdowndelete)
-   [**Example**](#example)

## Methods

### Dropdown.insertDropdown()

```javascript
/**
 * Inserts Dropdown in pdf-editor
 */
Dropdown.insertDropdown();
```

### Dropdown Settings

This methods using [DropdownSettings](../../../../rightmenu/basesettings/formatsettings/subsettings/Dropdownsettings.js) lib.

#### Dropdown.setRole(role)

```javascript
/**
 * Set role in dropdown settings
 * @param {string} role - target role
 */
Dropdown.setRole(role);
```

#### Dropdown.setFields(fileds)

```javascript
/**
 * Sets various fields in the dropdown settings.
 * @param {{fieldName: string}} settings - Object containing field values,
 * the field name matches the corresponding field in the settings menu
 */
Dropdown.setFields(fileds);
```

For Dropdown field name (key, placeholder, tag, tip)

#### Dropdown.setValueOptions(valueOption, fixedSize)

```javascript
/**
 * Sets value options in the dropdown.
 * @param {{value: string | undefined, index: number | undefined, deleteValue: boolean | undefined, defaultValue: boolean | undefined}} valueOption - Object containing value options.
 * @param {boolean} [fixedSize=false] - Whether the value list has a fixed size.
 */
Dropdown.setValueOptions(valueOption, fixedSize);
```

#### Dropdown.setColor(colorOptions)

```javascript
/**
 * Sets color options for the dropdown.
 * @param {{border: {colorIndex: number, noBorder: boolean | undefined} | undefined,
 *          backgroundColor: Color | undefined}} colorOptions - Object containing border and background color configurations.
 */
Dropdown.setColor(colorOptions);
```

This method use [Color](../../../../common/color/README.md) object

#### Dropdown.setRequired(required)

```javascript
/**
 * Sets the required state of the dropdown.
 * @param {boolean} [isRequired=true] - Whether the field is required.
 */
Dropdown.setRequired(required);
```

#### Dropdown.lock()

```javascript
/**
 * Locks or unlock the dropdown settings.
 */
Dropdown.lock();
```

#### Dropdown.delete()

```javascript
/**
 * Deletes the dropdown.
 */
Dropdown.delete();
```

## Example

```javascript
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
```
