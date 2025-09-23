# Macros

This library implements interaction with the Macros plugin.

## Table of Contents

-   [Macros](#macros)
    -   [Table of Contents](#table-of-contents)
    -   [Methods](#methods)
        -   [Macros.aiConvertFromVba(vbaCode)](#macrosaiconvertfromvbavbacode)
        -   [Macros.aiCreateFromDescription(description)](#macrosaicreatefromdescriptiondescription)
        -   [Macros.openMacros()](#macrosopenmacros)
        -   [Macros.setMacrosAutostart(condition)](#macrossetmacrosautostartcondition)
        -   [Macros.undo()](#macrosundo)
        -   [Macros.redo()](#macrosredo)
        -   [Macros.debug()](#macrosdebug)
        -   [Macros.copyMacros(name)](#macroscopymacrosname)
        -   [Macros.deleteMacros(name)](#macrosdeletemacrosname)
        -   [Macros.renameMacros(oldName, newName)](#macrosrenamemacrosoldname-newname)
        -   [Macros.selectMacrosByName(name)](#macrosselectmacrosbynamename)
        -   [Macros.cancelMacros()](#macroscancelmacros)
        -   [Macros.addMacros()](#macrosaddmacros)
        -   [Macros.saveMacros()](#macrossavemacros)
        -   [Macros.runMacros(name)](#macrosrunmacrosname)
        -   [Macros.inputScript(script, clearInput)](#macrosinputscriptscript-clearinput)
        -   [Macros.deleteCustomFunction(name)](#macrosdeletecustomfunctionname)
        -   [Macros.renameCustomFunction(oldName, newName)](#macrosrenamecustomfunctionoldname-newname)
        -   [Macros.addCustomFunction()](#macrosaddcustomfunction)
        -   [Macros.selectCustomFunction(name)](#macrosselectcustomfunctionname)
    -   [Example](#example)

## Methods

### Macros.aiConvertFromVba(vbaCode)

```javascript
/**
 * Converts a VBA macro to a macro script.
 * Before using this method, you must configure and enable the AI plugin in the “Plugins” tab
 * @param {string} vbaCode The VBA code to convert.
 */
Macros.aiConvertFromVba(vbaCode);
```

### Macros.aiCreateFromDescription(description)

```javascript
/**
 * Creates a macro from a description.
 * Before using this method, you must configure and enable the AI plugin in the “Plugins” tab
 * @param {string} description The description of the macro to create.
 */
Macros.aiCreateFromDescription(description);
```

### Macros.openMacros()

```javascript
/**
 * Opens the Macros dialog.
 */
Macros.openMacros();
```

### Macros.setMacrosAutostart(condition)

```javascript
/**
 * Sets the autostart condition for a macro.
 * @param {boolean} condition The condition to set the autostart to.
 */
Macros.setMacrosAutostart(condition);
```

### Macros.undo()

```javascript
/**
 * Undoes the last action.
 */
Macros.undo();
```

### Macros.redo()

```javascript
/**
 * Redoes the last action.
 */
Macros.redo();
```

### Macros.debug()

```javascript
/**
 * Debugs the current macro.
 */
Macros.debug();
```

### Macros.copyMacros(name)

```javascript
/**
 * Copies a macro by its name from the list of macros.
 * @param {string} name The name of the macro to copy.
 */
Macros.copyMacros(name);
```

### Macros.deleteMacros(name)

```javascript
/**
 * Deletes a macro by its name from the list of macros.
 * @param {string} name The name of the macro to delete.
 */
Macros.deleteMacros(name);
```

### Macros.renameMacros(oldName, newName)

```javascript
/**
 * Renames a macro by its name from the list of macros.
 * @param {string} oldName The old name of the macro to rename.
 * @param {string} newName The new name of the macro.
 */
Macros.renameMacros(oldName, newName);
```

### Macros.selectMacrosByName(name)

```javascript
/**
 * Selects a macro by its name from the list of macros.
 * @param {string} name The name of the macro to select.
 */
Macros.selectMacrosByName(name);
```

### Macros.cancelMacros()

```javascript
/**
 * Cancels the Macros dialog.
 */
Macros.cancelMacros();
```

### Macros.addMacros()

```javascript
/**
 * Adds a new macro by clicking the add button.
 */
Macros.addMacros();
```

### Macros.saveMacros()

```javascript
/**
 * Saves the current macro by clicking the save button.
 */
Macros.saveMacros();
```

### Macros.runMacros(name)

```javascript
/**
 * Runs the selected macro by clicking the run button.
 * @param {string} name The name of the macro to run.
 */
Macros.runMacros(name);
```

### Macros.inputScript(script, clearInput)

```javascript
/**
 * Inputs a script into the Macros dialog.
 * @param {string} script The script to be inputted into the Macros dialog.
 * @param {boolean} clearInput - clear input before entering text (default: true)
 */
Macros.inputScript(script, clearInput);
```

### Macros.deleteCustomFunction(name)

```javascript
/**
 * Deletes a custom function by its name from the list of custom functions. (For CSE)
 * @param {string} name The name of the custom function to delete.
 */
Macros.deleteCustomFunction(name);
```

### Macros.renameCustomFunction(oldName, newName)

```javascript
/**
 * Renames a custom function by its name from the list of custom functions. (For CSE)
 * @param {string} oldName The old name of the custom function to rename.
 * @param {string} newName The new name of the custom function.
 */
Macros.renameCustomFunction(oldName, newName);
```

### Macros.addCustomFunction()

```javascript
/**
 * Adds a custom function to the Macros dialog (For CSE).
 */
Macros.addCustomFunction();
```

### Macros.selectCustomFunction(name)

```javascript
/**
 * Selects a custom function by its name from the list of custom functions. (For CSE)
 * @param {string} name The name of the custom function to select.
 */
Macros.selectCustomFunction(name);
```

## Example

```javascript
// Include the Macros library
const { Macros } = require("lib");

// Open the Macros dialog
Macros.openMacros();

// Create a new macro
Macros.addMacros();

// Macro script
const macrosScript = `
let doc = Api.GetDocument();
let paragraph = Api.CreateParagraph();
paragraph.AddText("Hello world!");
doc.InsertContent([paragraph]);
`;

// Input the script into the Macros dialog
Macros.inputScript(macrosScript);

// Run the macro
Macros.runMacros("Macro 1");

// Save the macro
Macros.saveMacros();

// Close the test example
Tester.close();
```
