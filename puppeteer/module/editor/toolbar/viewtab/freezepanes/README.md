# FreezePanes

Library for interacting with the "Freeze Panes" button in the View tab of a spreadsheet editor.

## Table of Contents

-   [**Methods**](#methods)

    -   [`FreezePanes.setFreezePanes(optionValue)`](#freezepanessetfreezepanesoptionvalue)
    -   [`FreezePanes.FreezePanes()`](#freezepanesfreezepanes)
    -   [`FreezePanes.UnfreezePanes()`](#freezepanesunfreezepanes)
    -   [`FreezePanes.FreezeTopRow()`](#freezepanesfreezetoprow)
    -   [`FreezePanes.FreezeFirstColumn()`](#freezepanesfreezefirstcolumn)
    -   [`FreezePanes.ShowFrozenPanesShadow(condition)`](#freezepanesshowfrozenpanesshadowcondition)

-   [**Example**](#example)

## Methods

### FreezePanes.setFreezePanes(optionValue)

```javascript
/**
 * Set a specific Freeze Panes option from dropdown.
 * @param {"Freeze Panes" | "Freeze top row" | "Freeze first column" | "Show frozen panes shadow"} optionValue
 */
FreezePanes.setFreezePanes("Freeze top row");
```

### FreezePanes.FreezePanes()

```javascript
/**
 * Set the "Freeze Panes" option
 */
FreezePanes.FreezePanes();
```

### FreezePanes.UnfreezePanes()

```javascript
/**
 * Set the "Unfreeze Panes" option (same as Freeze Panes if toggled)
 */
FreezePanes.UnfreezePanes();
```

### FreezePanes.FreezeTopRow()

```javascript
/**
 * Set the "Freeze top row" option
 */
FreezePanes.FreezeTopRow();
```

### FreezePanes.FreezeFirstColumn()

```javascript
/**
 * Set the "Freeze first column" option
 */
FreezePanes.FreezeFirstColumn();
```

### FreezePanes.ShowFrozenPanesShadow(condition)

```javascript
/**
 * Toggle "Show frozen panes shadow" checkbox
 * @param {boolean} condition
 */
FreezePanes.ShowFrozenPanesShadow(true);
```

## Example

```javascript
const { FreezePanes } = require("lib");

Tester.createFile("xlsx");

// freeze the top row
FreezePanes.FreezeTopRow();

// freeze the first column
FreezePanes.FreezeFirstColumn();

// enable frozen panes shadow
FreezePanes.ShowFrozenPanesShadow(true);

// unfreeze panes
FreezePanes.UnfreezePanes();

Tester.close();
```
