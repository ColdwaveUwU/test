# SheetView

Library for interacting with the "Sheet View" functionality in a spreadsheet application.

## Table of Contents

-   [**Methods**](#methods)

    -   [`SheetView.selectView(optionValue)`](#sheetviewselectviewoptionvalue)
    -   [`SheetView.selectDefault()`](#sheetviewselectdefault)
    -   [`SheetView.viewManager()`](#sheetviewviewmanager)
    -   [`SheetView.closeViewManager()`](#sheetviewcloseviewmanager)
    -   [`SheetView.createView()`](#sheetviewcreateview)
    -   [`SheetView.renameView(new_name)`](#sheetviewrenameviewnew_name)
    -   [`SheetView.duplicateView()`](#sheetviewduplicateview)
    -   [`SheetView.deleteView()`](#sheetviewdeleteview)
    -   [`SheetView.closeView()`](#sheetviewcloseview)

## Methods

### SheetView\.selectView(optionValue)

```javascript
/**
 * Set the view
 * @param {string} optionValue - The name of the sheet view option to select.
 */
SheetView.selectView("View1");
```

### SheetView\.selectDefault()

```javascript
/**
 * Set the view to default
 */
SheetView.selectDefault();
```

### SheetView\.viewManager()

```javascript
/**
 * Set the view to view manager
 */
SheetView.viewManager();
```

### SheetView\.closeViewManager()

```javascript
/**
 * Close the view manager
 */
SheetView.closeViewManager();
```

### SheetView\.createView()

```javascript
/**
 * Set the view to create view
 */
SheetView.createView();
```

### SheetView\.renameView(new_name)

```javascript
/**
 * Rename the view
 * @param {string} new_name - The new name of the view.
 */
SheetView.renameView("Custom View");
```

### SheetView\.duplicateView()

```javascript
/**
 * Duplicate the view
 */
SheetView.duplicateView();
```

### SheetView\.deleteView()

```javascript
/**
 * Delete the view
 * @param {string} name - The name of the view to delete.
 */
SheetView.deleteView("View1");
```

### SheetView\.closeView()

```javascript
/**
 * Set the view to close view
 */
SheetView.closeView();
```

## Example

```javascript
const { SheetView } = require("lib");
Tester.createFile("xlsx");

// Create a view
SheetView.createView();

// Select view
SheetView.selectView("View1");

// Rename view
SheetView.renameView("My Custom View");

// Duplicate view
SheetView.duplicateView();

// Delete the duplicated view
SheetView.deleteView("My Custom View");

// Close the view
SheetView.closeView();

Tester.close();
```
