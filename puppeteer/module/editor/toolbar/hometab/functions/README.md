# Functions

This library implements interaction with the Functions functionality in Excel/Spreadsheet applications.

## Table of Contents

-   [**Methods**](#methods)
    -   [`Functions.setFunction(optionValue, pressEnter)`](#functionssetfunctionoptionvalue-pressenter)
    -   [`Functions.insertFunction(options)`](#functionsinsertfunctionoptions)
    -   [`Functions.setFunctionArguments(parameters)`](#functionssetfunctionargumentsparameters)
-   [**Example**](#example)

## Methods

### Functions.setFunction(optionValue, pressEnter)

```javascript
/**
 * Selects a function from the insert function dropdown button
 * @param {"SUM" | "AVERAGE" | "MIN" | "MAX" | "COUNT" } optionValue - The value of the function to select.
 * @param {boolean} [pressEnter=false] - Whether to press Enter after selecting the function.
 */
Functions.setFunction(optionValue, pressEnter);
```

### Functions.insertFunction(options)

```javascript
/**
 * Inserts a function into the worksheet from additional functions dropdown "Additional" button
 * Call this function only on an empty cell.
 * @param {Object} options - The options for the function.
 * @param {string} options.functionName - The name of the function to search and insert in the insert function modal window.
 * @param {Array<string>} options.parameters - Array of parameter values for the function arguments window (e.g., ["A1:A10", "B1:B10"]).
 */
Functions.insertFunction(options);
```

### Functions.setFunctionArguments(parameters)

```javascript
/**
 * Sets function arguments in the function arguments modal window
 * Call this function only after the function is inserted.
 * @param {Array<string>} parameters - Array of parameter values to set (e.g., ["A1:A10", "B1:B10"])
 */
Functions.setFunctionArguments(parameters);
```

## Example

```javascript
// Include the Functions library
const { Functions } = require("lib");

// Open the file new.xlsx
Tester.createFile("xlsx");

// Add test data in first row
Tester.input("10");
Tester.keyPress("Tab");
Tester.input("20");
Tester.keyPress("Tab");
Tester.input("30");
Tester.keyPress("Tab");
Tester.input("40");
Tester.keyPress("ArrowDown");

// Test basic function selection from dropdown
Functions.setFunction("SUM");
Functions.setFunctionArguments(["A1:D1"]);

// Move to next cell and test AVERAGE function
Tester.keyPress("ArrowDown");
Functions.setFunction("AVERAGE");
Functions.setFunctionArguments(["A1:D1"]);

// Move to next cell and test MIN function
Tester.keyPress("ArrowDown");
Functions.setFunction("MIN");
Functions.setFunctionArguments(["A1:D1"]);

// Move to next cell and test MAX function
Tester.keyPress("ArrowDown");
Functions.setFunction("MAX");
Functions.setFunctionArguments(["A1:D1"]);

// Move to next cell and test COUNT function
Tester.keyPress("ArrowDown");
Functions.setFunction("COUNT");
Functions.setFunctionArguments(["A1:D1"]);

// Test inserting a custom function from Additional menu
Tester.keyPress("ArrowDown");
Functions.insertFunction({
    functionName: "AVERAGE",
    parameters: ["A1:D1"],
});

// Test inserting another custom function
Tester.keyPress("ArrowDown");
Functions.insertFunction({
    functionName: "POWER",
    parameters: ["A1", "2"],
});

// Test inserting function with multiple parameters
Tester.keyPress("ArrowDown");
Functions.insertFunction({
    functionName: "IF",
    parameters: ["A1>15", '"High"', '"Low"'],
});

// Close the test example
Tester.close();
```
