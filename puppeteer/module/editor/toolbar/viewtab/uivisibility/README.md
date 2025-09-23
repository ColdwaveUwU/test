# UIVisibility

Library for toggling visibility of various UI elements from the View tab.

## Table of Contents

-   [**Methods**](#methods)

    -   [`UIVisibility.setToolbarVisibility(condition)`](#uitoolbar)
    -   [`UIVisibility.setStatusbarVisibility(condition)`](#uistatusbar)
    -   [`UIVisibility.setLeftPanelVisibility(condition)`](#uileftpanel)
    -   [`UIVisibility.setRightPanelVisibility(condition)`](#uirightpanel)
    -   [`UIVisibility.setRulersVisibility(condition)`](#uirulers)
    -   [`UIVisibility.setFormulaBarVisibility(condition)`](#uiformulabar)
    -   [`UIVisibility.setHeadingVisibility(condition)`](#uiheading)
    -   [`UIVisibility.setGridlinesVisibility(condition)`](#uigridlines)
    -   [`UIVisibility.setZerosVisibility(condition)`](#uizeros)
    -   [`UIVisibility.setNotesVisibility(condition)`](#uinotes)

-   [**Example**](#example)

## Methods

### UIVisibility.setToolbarVisibility(condition)

```javascript
/**
 * Toggle toolbar visibility
 * @param {boolean} condition
 */
UIVisibility.setToolbarVisibility(true);
```

### UIVisibility.setStatusbarVisibility(condition)

```javascript
/**
 * Toggle statusbar visibility
 * @param {boolean} condition
 */
UIVisibility.setStatusbarVisibility(false);
```

### UIVisibility.setLeftPanelVisibility(condition)

```javascript
/**
 * Toggle left panel visibility
 * @param {boolean} condition
 */
UIVisibility.setLeftPanelVisibility(true);
```

### UIVisibility.setRightPanelVisibility(condition)

```javascript
/**
 * Toggle right panel visibility
 * @param {boolean} condition
 */
UIVisibility.setRightPanelVisibility(false);
```

### UIVisibility.setRulersVisibility(condition)

```javascript
/**
 * Toggle rulers visibility (only for CDE)
 * @param {boolean} condition
 */
UIVisibility.setRulersVisibility(true);
```

### UIVisibility.setFormulaBarVisibility(condition)

```javascript
/**
 * Toggle formula bar visibility (only for CSE)
 * @param {boolean} condition
 */
UIVisibility.setFormulaBarVisibility(true);
```

### UIVisibility.setHeadingVisibility(condition)

```javascript
/**
 * Toggle heading visibility (only for CSE)
 * @param {boolean} condition
 */
UIVisibility.setHeadingVisibility(true);
```

### UIVisibility.setGridlinesVisibility(condition)

```javascript
/**
 * Toggle gridlines visibility (only for CSE)
 * @param {boolean} condition
 */
UIVisibility.setGridlinesVisibility(false);
```

### UIVisibility.setZerosVisibility(condition)

```javascript
/**
 * Toggle zeros visibility (only for CSE)
 * @param {boolean} condition
 */
UIVisibility.setZerosVisibility(false);
```

### UIVisibility.setNotesVisibility(condition)

```javascript
/**
 * Toggle notes visibility (only for CPE)
 * @param {boolean} condition
 */
UIVisibility.setNotesVisibility(true);
```

## Example

```javascript
const { UIVisibility } = require("lib");

Tester.createFile("docx");

UIVisibility.setToolbarVisibility(false);
UIVisibility.setStatusbarVisibility(false);
UIVisibility.setLeftPanelVisibility(false);
UIVisibility.setRightPanelVisibility(false);
UIVisibility.setRulersVisibility(false);

Tester.close();
```
