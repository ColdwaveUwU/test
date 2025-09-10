# PageColumns

This library implements interaction with the PageColumns settings.

## Table of Contents

-   [**Methods**](#methods)
    -   [`PageColumns.setColumns(optionValue)`](#pagecolumnssetcolumnsoptionvalue)
    -   [`PageColumns.openCustomColumnsWindow()`](#pagecolumnsopencustomcolumnswindow)
    -   [`PageColumns.applySettings(customColumnsSettings)`](#pagecolumnsapplysettingscustomcolumnssettings)
    -   [`PageColumns.clickOkButton()`](#pagecolumnsclickokbutton)
-   [**Example**](#example)

## Methods

### PageColumns.setColumns(optionValue)

```javascript
/**
 * Select page columns option from dropdown menu
 * @param {"One" | "Two" | "Three" | "Left" | "Right" | "Custom columns"} [optionValue]
 */
PageColumns.setColumns(optionValue);
```

### PageColumns.openCustomColumnsWindow()

```javascript
/**
 * Open custom columns window
 */
PageColumns.openCustomColumnsWindow();
```

### PageColumns.applySettings(customColumnsSettings)

```javascript
/**
 * Apply settings in Columns window
 * @param {Object} customColumnsSettings
 */
PageColumns.applySettings(customColumnsSettings);
```

### PageColumns.clickOkButton()

```javascript
/**
 * Click OK button in Columns window
 */
PageColumns.clickOkButton();
```

## Example

```javascript
// Include the PageColumns library
const { PageColumns } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Select columns "Three"
PageColumns.setColumns("Three");

// Open "Columns" window
PageColumns.openCustomColumnsWindow();

// Specify custom columns settings
const customColumnsSettings = {
    numberOfColumns: { value: "4" },
    equalColumnWidth: false,
    columnDivider: true,
    columns: [
        {
            number: 2,
            width: { value: "1.1" },
            spacing: { value: "0.3" },
        },
        {
            number: 4,
            width: { value: "1.25" },
        },
    ],
};

// Apply settings for custom columns
PageColumns.applySettings(customColumnsSettings);

// Click OK button in Columns window
PageColumns.clickOkButton();

// Close the test example
Tester.close();
```
