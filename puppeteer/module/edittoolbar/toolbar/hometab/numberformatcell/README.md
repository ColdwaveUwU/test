# NumberFormatCell

A library for interacting with number formats. Interacts with the elements located on the Home tab od spreadsheet editor.

## Table of Contents

-   [**Methods**](#methods)
    -   [`NumberFormatCell.setFormat(format);`](#numberformatcellsetformatformat)
    -   [`NumberFormatCell.clickAccountingStyle();`](#numberformatcellclickaccountingstyle)
    -   [`NumberFormatCell.setAccountingStyle(style);`](#numberformatcellsetaccountingstylestyle)
    -   [`NumberFormatCell.clickPercentStyle();`](#numberformatcellclickpercentstyle)
    -   [`NumberFormatCell.clickCommaStyle();`](#numberformatcellclickcommastyle)
    -   [`NumberFormatCell.clickDecreaseDecimal(clickCount);`](#numberformatcellclickdecreasedecimalclickcount)
    -   [`NumberFormatCell.clickIncreaseDecimal(clickCount);`](#numberformatcellclickincreasedecimalclickcount)
-   [**Example**](#example)

## Methods

### `NumberFormatCell.setFormat(format);`

```javascript
/**
 * Select number format from list
 * @param {string} format
 */ 
NumberFormatCell.setFormat(format);
```

### `NumberFormatCell.clickAccountingStyle();`

```javascript
/**
 * Click on Accounting style button
 */
NumberFormatCell.clickAccountingStyle();
```

### `NumberFormatCell.setAccountingStyle(style);`

```javascript
/**
 * Select accounting style from list
 * @param {string} style
 */
NumberFormatCell.setAccountingStyle(style);
```

### `NumberFormatCell.clickPercentStyle();`

```javascript
/**
 * Click on Percent style button
 */
NumberFormatCell.clickPercentStyle();
```

### `NumberFormatCell.clickCommaStyle();`

```javascript
/**
 * Click on Comma style button
 */
NumberFormatCell.clickCommaStyle();
```

### `NumberFormatCell.clickDecreaseDecimal(clickCount);`

```javascript
/**
 * Click on Decrease decimal button
 * @param {number} clickCount
 */
NumberFormatCell.clickDecreaseDecimal(clickCount);
```

### `NumberFormatCell.clickIncreaseDecimal(clickCount);`

```javascript
/**
 * Click on Increase decimal button
 * @param {number} clickCount
 */
NumberFormatCell.clickIncreaseDecimal(clickCount);
```

## Example

```javascript
// Include the Toolbar library
const { NumberFormatCell } = require("lib");
// Open the file new.xlsx
Tester.createFile("xlsx");
// Select Scientific number format
NumberFormatCell.setFormat("Scientific");
// Number input with Scientific number format
Tester.input("123");
Tester.keyPress("Tab");
// Set Accounting style by click on button
NumberFormatCell.clickAccountingStyle();
// Number input with Accounting style
Tester.input("123");
Tester.keyPress("Tab");
// Set € Euro accounting style
NumberFormatCell.setAccountingStyle("€ Euro");
// Number input with € Euro accounting style
Tester.input("123");
Tester.keyPress("Tab");
// Set Percent style
NumberFormatCell.clickPercentStyle();
// Number input with Percent style
Tester.input("123");
Tester.keyPress("Tab");
// Set Comma style
NumberFormatCell.clickCommaStyle();
// Number input with Comma style
Tester.input("123");
Tester.keyPress("Tab");
//Number input to check Decrease decimal and Increase decimal
Tester.input("123");
Tester.keyPress("ArrowDown");
Tester.keyPress("ArrowUp");
//Increase decimal 2 times
NumberFormatCell.clickIncreaseDecimal(2);
//Decrease decimal 2 times
NumberFormatCell.clickDecreaseDecimal(2);
// Close the test example
Tester.close();
```
