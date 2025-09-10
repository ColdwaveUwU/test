# Checkbox

This library interacts with the Checkbox in pdf-editor.

## Table of Contents

-   [**Methods**](#methods)
    -   [`Checkbox.insertCheckbox()`](#checkboxinsertcheckbox)
    -   [`Checkbox.setRole(role)`](#checkboxsetrolerole)
    -   [`Checkbox.setFields(fileds)`](#checkboxsetfieldsfileds)
    -   [`Checkbox.setDefaultCheckbox(isdefault)`](#checkboxsetdefaultcheckboxisdefault)
    -   [`Checkbox.setFixedSize(isfixed)`](#checboxsetfixedsizeisfixed)
    -   [`Checkbox.setColor(colorOptions)`](#checkboxsetcolorcoloroptions)
    -   [`Checkbox.setRequired(required)`](#checkboxsetrequiredrequired)
    -   [`Checkbox.lock()`](#checkboxlock)
    -   [`Checkbox.delete()`](#checkboxdelete)
-   [**Example**](#example)

## Methods

### Checkbox.insertCheckbox()

```javascript
/**
 * Inserts checkbox in pdf-editor
 */
Checkbox.insertCheckbox();
```

### Checkbox Settings

This methods using [CheckboxSettings](../../../../rightmenu/basesettings/formatsettings/subsettings/checkboxsettings/checkboxsettings.js) lib.

#### Checkbox.setRole(role)

```javascript
/**
 * Set role in checkbox settings
 * @param {string} role - target role
 */
Checkbox.setRole(role);
```

#### Checkbox.setFields(fileds)

```javascript
/**
 * Sets various fields in the checkbox settings.
 * @param {{fieldName: string}} settings - Object containing field values,
 * the field name matches the corresponding field in the settings menu
 */
Checkbox.setFields(fileds);
```

For Checkbox field name ( key, tip, tag )

### Checkbox.setDefaultCheckbox(isDefault)

```javascript
/**
 * Sets the default state of the checkbox.
 * @param {boolean} [isDefault=true] - Whether the checkbox is default.
 */
Checkbox.setDefaultCheckbox(isDefault);
```

### Checbox.setFixedSize(isFixed)

```javascript
/**
 * Sets the fixed size of the checkbox.
 * @param {boolean} [isFixed=true] - Whether the checkbox is fixed.
 */
Checkbox.setFixedSize(isFixed);
```

#### Checkbox.setColor(colorOptions)

```javascript
/**
 * Sets color options for the checkbox.
 * @param {{border: {colorIndex: number, noBorder: boolean | undefined} | undefined,
 *          backgroundColor: Color | undefined}} colorOptions - Object containing border and background color configurations.
 */
Checkbox.setColor(colorOptions);
```

This method use [Color](../../../../common/color/README.md) object

#### Checkbox.setRequired(required)

```javascript
/**
 * Sets the required state of the checkbox.
 * @param {boolean} [isRequired=true] - Whether the field is required.
 */
Checkbox.setRequired(required);
```

#### Checkbox.lock()

```javascript
/**
 * Locks or unlock the checkbox settings.
 */
Checkbox.lock();
```

#### Checkbox.delete()

```javascript
/**
 * Deletes the checkbox.
 */
Checkbox.delete();
```

## Example

```javascript
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
```
