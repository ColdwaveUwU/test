# ToolMenuThumbnails

This library implements interaction with the Thumbnails menu.

## Table of Contents

-   [**Methods**](#methods)
    -   [`ToolMenuThumbnails.openMenu()`](#toolmenuthumbnailsopenmenu)
    -   [`ToolMenuThumbnails.closeMenu()`](#toolmenuthumbnailsclosemenu)
    -   [`ToolMenuThumbnails.selectThumbnailsMenu()`](#toolmenuthumbnailsselectthumbnailsmenu)
    -   [`ToolMenuThumbnails.setThumbnailsOption(options)`](#toolmenuthumbnailssetthumbnailsoptionoptions)
    -   [`ToolMenuThumbnails.goToThumbnail(thumbNumber)`](#toolmenuthumbnailsgotothumbnailthumbNumber)
    -   [`ToolMenuThumbnails.getCurrentThumbnailNumber()`](#toolmenuthumbnailsgetcurrentthumbnailnumber)
    -   [`ToolMenuThumbnails.getCountThumbnails()`](#toolmenuthumbnailsgetcountthumbnails)
-   [**Example**](#example)

## Methods

### ToolMenuThumbnails.openMenu()

```javascript
/**
 * Opens the menu
 */
ToolMenuThumbnails.openMenu();
```

### ToolMenuThumbnails.closeMenu()

```javascript
/**
 * Closes the menu
 */
ToolMenuThumbnails.closeMenu();
```

### ToolMenuThumbnails.selectThumbnailsMenu()

```javascript
/**
 * Select thumbnail list area
 */
ToolMenuThumbnails.selectThumbnailsMenu();
```

### ToolMenuThumbnails.setThumbnailsOption(options)

```javascript
/**
 * Sets thumbnails options
 * This method is not supported for the slide editor.
 * @param {{size: number | undefined, highlight: boolean | undefined}} options
 */
ToolMenuThumbnails.setThumbnailsOption(options);
```

### ToolMenuThumbnails.goToThumbnail(thumbNumber)

```javascript
/**
 * Go to thumbnail by number
 * @param {number} thumbNumber
 */
ToolMenuThumbnails.goToThumbnail(thumbNumber);
```

### ToolMenuThumbnails.getCurrentThumbnailNumber()

```javascript
/**
 * Get current thumbnail number
 * @returns {Promise<number>}
 */
ToolMenuThumbnails.getCurrentThumbnailNumber();
```

### ToolMenuThumbnails.getCountThumbnails()

```javascript
/**
 * Get count thumbnails
 * @returns {Promise<number>}
 */
ToolMenuThumbnails.getCountThumbnails();
```

## Example

```javascript
// Include the ToolMenuThumbnails library
const { ToolMenuThumbnails } = require("lib");

// Open the file new.pdf
Tester.createFile("pdf");

// Open thumbnails menu
ToolMenuThumbnails.openMenu();

// Select thumbnail list area
ToolMenuThumbnails.selectThumbnailsMenu();

// Set thumbnails options
ToolMenuThumbnails.setThumbnailsOption({ size: 150, highlight: true });

// Get count of thumbnails
const countThumbnails = ToolMenuThumbnails.getCountThumbnails();

// Get current thumbnail number
const currentThumbnail = ToolMenuThumbnails.getCurrentThumbnailNumber();

// Go to thumbnail by number
ToolMenuThumbnails.goToThumbnail(3);

// Close thumbnails menu
ToolMenuThumbnails.closeMenu();

// Close the test example
Tester.close();
```
