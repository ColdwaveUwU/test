# FileMenu

Library for changing `FileMenu` settings. The behavior of library methods depends on the type of editor used (word, cell, slide or pdf).

## Table of Contents

-   [**Methods**](#methods)
    -   [FileMenu.clickFileMenu()](#filemenuclickfilemenu)
    -   [FileMenu.createNew(type)](#filemenucreatenewtype)
    -   [FileMenu.save()](#filemenusave)
    -   [FileMenu.downloadAs(extension)](#filemenudownloadasextension)
    -   [FileMenu.saveCopyAs(extension)](#filemenusavecopyasextension)
    -   [FileMenu.rename(newName)](#filemenurenamenewname)
    -   [FileMenu.protect(protectSettings)](#filemenuprotectprotectsettings)
    -   [FileMenu.getDocumentInfo()](#filemenugetdocumentinfo)
    -   [FileMenu.addProperties(propertiesSettings)](#filemenuaddpropertiespropertiessettings)
    -   [FileMenu.setAdvancedSettings(advSettings)](#filemenusetadvancedsettingsadvsettings)
-   [**Using Objects**](#using-objects)
    -   [Common](#common-settings)
    -   [Word](#word-settings)
    -   [PDF](#pdf-settings)
    -   [Cell](#cell-settings)
    -   [Slide](#slide-settings)
-   [**Example**](#example)
    -   [Word](#word)
    -   [Pdf](#pdf)
    -   [Cell](#cell)
    -   [Slide](#slide)

## Methods

### FileMenu.clickFileMenu()

```javascript
/**
 * Open FileMenu section
 */
FileMenu.clickFileMenu();
```

### FileMenu.createNew(type)

```javascript
/**
 * Creates a new file based on the specified template.
 * @param {Blank document | Blank | With sample content | Blank Spreadsheet | Blank Presentation} type
 */
FileMenu.createNew(type);
```

### FileMenu.save()

```javascript
/**
 * Saves the current file.
 */
FileMenu.save();
```

### FileMenu.downloadAs(extension)

```javascript
/**
 * Downloads the current file in a specified format.
 * @param {string} extension - file extension
 */
FileMenu.downloadAs(extension);
```

### FileMenu.saveCopyAs(extension)

```javascript
/**
 * Saves a copy of the current file in a specified format.
 * @param {string} extension - file extension
 */
FileMenu.saveCopyAs(extension);
```

### FileMenu.rename(newName)

```javascript
/**
 * Renames the current file.
 * @param {string} newName
 */
FileMenu.rename(newName);
```

### FileMenu.protect(protectSettings)

Using [ProtectSettings](#protectsettings)

```javascript
/**
 * Protects the file by adding, changing, or deleting a password.
 * @param {ProtectSettings} protectSettings
 */
FileMenu.protect(protectSettings);
```

### FileMenu.getDocumentInfo()

```javascript
/**
 * Retrieves document information for the current file.
 * @returns {Object}
 */
FileMenu.getDocumentInfo();
```

### FileMenu.addProperties(propertiesSettings)

Using [PropertiesSettings](#propertiessettings).

```javascript
/**
 * Adds properties or metadata to the file.
 * @param {PropertiesSettings} propertiesSettings
 */
FileMenu.addProperties(propertiesSettings);
```

### FileMenu.setAdvancedSettings(advSettings)

Using [WordAdvancedSettings](#wordadvancedsettings) | [CellAdvancedSettings](#celladvancedsettings) | [PdfAdvancedSettings](#pdfadvancedsettings) | [SlideAdvancedSettings](#slideadvancedsettings).

```javascript
/**
 * Configures advanced settings for the file
 * @param {WordAdvancedSettings | CellAdvancedSettings | SlideAdvancedSettings | PdfAdvancedSettings }
 */
FileMenu.setAdvancedSettings(advSettings);
```

## Using Objects

### **Common Settings**

#### ProtectSettings

```javascript
/**
 * @typedef {Object} ProtectSettings
 * @property {{password: string, repeatPassword: string}} addPassword
 * @property {{password: string, repeatPassword: string}} changePassword
 * @property {boolean} deletePassword
 */
```

#### PropertiesSettings

```javascript
/**
 * @typedef {Object} PropertiesSettings
 * @property {{title: string, type: string, value: string}} addProperty
 * @property {string} author
 * @property {string} title
 * @property {string} tags
 * @property {string} subject
 * @property {string} comment
 */
```

#### QuickAccessSettings

```javascript
/**
 * @typedef {Object} QuickAccessSettings
 * @property {boolean} save - Save
 * @property {boolean} print - Print
 * @property {boolean} undo - Undo
 * @property {boolean} redo - Redo
 */
```

#### MethodButtonSettings

```javascript
/**
 * @typedef {Object} MethodButtonSettings
 * @property {"Reset to default" | "Add" | "Delete" | "Restore", "Reset"} methodButton - The method button action
 */
```

#### CalculatingSettings

```javascript
/**
 * @typedef {Object} CalculatingSettings
 * @property {boolean} useDateSystem - Use 1904 date system
 * @property {boolean} enableIter - Enable iterative calculation
 * @property {number | string} maxIter - Maximum iterations
 * @property {number | string} maxChange - Maximum change
 */
```

#### RegionalSettings

```javascript
/**
 * @typedef {Object} RegionalSettings
 * @property {string} formulaLang - Formula language
 * @property {string} region - Region
 * @property {boolean} useSep - Use separators based on regional settings
 * @property {number | string} decimalSep - Decimal separator
 * @property {number | string} thousandSep - Thousands separator
 */
```

#### **AdvancedSettingsBase**

```javascript
/**
 * @typedef {Object} AdvancedSettingsBase
 * @property {WordEditingSettings | PdfEditingSettings | SlideEditingSettings | CellEditingSettings} editing - The settings for editing and saving.
 * @property {WordCollaborationSettings | PdfCollaborationSettings | SlideCollaborationSettings | CellCollaborationSettings} collab - The settings for collaboration.
 * @property {WordProofingSettings | PdfProofingSettings | SlideProofingSettings | CellProofingSettings} proofing - The settings for proofing.
 * @property {WordAppearanceSettings | PdfAppearanceSettings | SlideAppearanceSettings | CellAppearanceSettings } appearance - The settings

 for appearance.
 * @property {WordWorkspaceSettings | PdfWorkspaceSettings | SlideWorkspaceSettings | CellWorkspaceSettings} workspace - The workspace settings.
 */
```

### **Word Settings**

```javascript
/**
 * @typedef {Object} WordAutoFormatSettings
 * @property {boolean} smartQuotes - "Straight quotes" with "smart quotes"
 * @property {boolean} dash - Hyphens (--) with dash (—)
 * @property {boolean} hyperlinks - Internet and network paths with hyperlinks
 * @property {boolean} doubleSpace - Add period with double-space
 * @property {boolean} bulletedList - Automatic bulleted lists
 * @property {boolean} numberedList - Automatic numbered lists
 */

/**
 * @typedef {Object} WordTextAutoCorrect
 * @property {boolean} sentences - Capitalize first letter of sentences
 * @property {boolean} tableCells - Capitalize first letter of table cells
 * @property {string} language - Exceptions for the language
 * @property {string} dontCap - Don’t capitalize after
 * @extends {MethodButtonSettings}
 */

/**
 * @typedef {Object} WordProofingSettings
 * @property {boolean} spellCheck - Spell Checking
 * @property {WordAutoCorrectSettings} autoCorrect - The auto-correction settings.
 */

/**
 * @typedef {Object} WordAppearanceSettings
 * @property {string} theme - Interface theme
 * @property {string} tabStyle - Tab style
 * @property {boolean} darkMode - Turn on document dark mode
 * @property {boolean} useToolbarColor - Use toolbar color as tabs background
 */

/**
 * @typedef {Object} WordWorkspaceSettings
 * @property {boolean} turnOnScreen - Turn on screen reader support
 * @property {boolean} alignment - Alignment guides
 * @property {boolean} useAlt - Use Alt key to navigate the user interface using the keyboard
 * @property {QuickAccessSettings} quickAccess - Customize quick access
 * @property {string} unit - Unit of measurement
 * @property {string} zoomValue - Default zoom value
 * @property {string} fontHinting - Font hinting
 * @property {string} macrosSettings - Macros settings
 */
```

#### WordAdvancedSettings

```javascript
/**
 * @typedef {AdvancedSettingsBase} WordAdvancedSettings
 */
```

### **Cell Settings**

```javascript
/**
 * @typedef {Object} CellAutoFormatSettings
 * @property {boolean} includeNewRows - Include new rows and columns in table
 */

/**
 * @typedef {Object} CellAutoCorrectSettings
 * @property {AutoCorrectMathSettings} math - Math AutoCorrect
 * @property {RecognizedSettings} recognized - Recognized functions
 * @property {CellAutoFormatSettings} autoFormat - AutoFormat as you type
 */

/**
 * @typedef {Object} CellProofingSettings
 * @property {string} dictLang - Dictionary language
 * @property {CellAutoCorrectSettings} autoCorrect - The auto-correction settings.
 */

/**
 * @typedef {Object} CellAppearanceSettings
 * @property {string} theme - Interface theme
 * @property {string} tabStyle - Tab style
 * @property {boolean} useToolbarColor - Use toolbar color as tabs background
 */

/**
 * @typedef {Object} CellWorkspaceSettings
 * @property {boolean} turnOnScreen - Turn on screen reader support
 * @property {boolean} r1c1 - R1C1 reference style
 * @property {boolean} useAlt - Use Alt key to navigate the user interface using the keyboard
 * @property {boolean} snappedToGrid - Snapped to the grid while scrolling
 * @property {QuickAccessSettings} quickAccess - Customize quick access
 * @property {string} unit - Unit of measurement
 * @property {string} zoomValue - Default zoom value
 * @property {string} fontHinting - Font hinting
 * @property {string} macrosSettings - Macros settings
 */
```

#### CellAdvancedSettings

```javascript
/**
 * @typedef {AdvancedSettingsBase} CellAdvancedSettings
 * @property {CalculatingSettings} calculating
 * @property {RegionalSettings} regionalSettings
 */
```

### **Slide Settings**

```javascript
/**
 * @typedef {Object} SlideAutoFormatSettings
 * @property {boolean} smartQuotes - "Straight quotes" with "smart quotes"
 * @property {boolean} dash - Hyphens (--) with dash (—)
 * @property {boolean} hyperlinks - Internet and network paths with hyperlinks
 * @property {boolean} doubleSpace - Add period with double-space
 * @property {boolean} bulletedList - Automatic bulleted lists
 * @property {boolean} numberedList - Automatic numbered lists
 */

/**
 * @typedef {Object} SlideTextAutoCorrect
 * @property {boolean} sentences - Capitalize first letter of sentences
 * @property {boolean} tableCells - Capitalize first letter of table cells
 * @property {string} language - Exceptions for the language
 * @property {string} dontCap - Don’t capitalize after
 * @extends {MethodButtonSettings}
 */

/**
 * @typedef {Object} SlideProofingSettings
 * @property {boolean} spellCheck - Spell Checking
 * @property {SlideAutoCorrectSettings} autoCorrect - The auto-correction settings.
 */

/**
 * @typedef {Object} SlideAppearanceSettings
 * @property {string} theme - Interface theme
 * @property {string} tabStyle - Tab style
 * @property {boolean} useToolbarColor - Use toolbar color as tabs background
 */

/**
 * @typedef {Object} SlideWorkspaceSettings
 * @property {boolean} turnOnScreen - Turn on screen reader support
 * @property {boolean} alignment - Alignment guides
 * @property {boolean} useAlt - Use Alt key to navigate the user interface using the keyboard
 * @property {QuickAccessSettings} quickAccess - Customize quick access
 * @property {string} unit - Unit of measurement
 * @property {string} zoomValue - Default zoom value
 * @property {string} fontHinting - Font hinting
 * @property {string} macrosSettings - Macros settings
 */
```

#### SlideAdvancedSettings

```javascript
/**
 * @typedef {AdvancedSettingsBase} SlideAdvancedSettings
 */
```

### **PDF Settings**

```javascript
/**
 * @typedef {Object} PdfAutoFormatSettings
 * @property {boolean} smartQuotes - "Straight quotes" with "smart quotes"
 * @property {boolean} dash - Hyphens (--) with dash (—)
 * @property {boolean} hyperlinks - Internet and network paths with hyperlinks
 * @property {boolean} doubleSpace - Add period with double-space
 * @property {boolean} bulletedList - Automatic bulleted lists
 * @property {boolean} numberedList - Automatic numbered lists
 */

/**
 * @typedef {Object} PdfTextAutoCorrect
 * @property {boolean} sentences - Capitalize first letter of sentences
 * @property {boolean} tableCells - Capitalize first letter of table cells
 * @property {string} language - Exceptions for the language
 * @property {string} dontCap - Don’t capitalize after
 * @extends {MethodButtonSettings}
 */

/**
 * @typedef {Object} PdfProofingSettings
 * @property {boolean} spellCheck - Spell Checking
 * @property {PdfAutoCorrectSettings} autoCorrect - The auto-correction settings.
 */

/**
 * @typedef {Object} PdfAppearanceSettings
 * @property {string} theme - Interface theme
 * @property {string} tabStyle - Tab style
 * @property {boolean} useToolbarColor - Use toolbar color as tabs background
 */

/**
 * @typedef {Object} PdfWorkspaceSettings
 * @property {boolean} turnOnScreen - Turn on screen reader support
 * @property {boolean} useAlt - Use Alt key to navigate the user interface using the keyboard
 * @property {QuickAccessSettings} quickAccess - Customize quick access
 * @property {string} unit - Unit of measurement
 * @property {string} zoomValue - Default zoom value
 * @property {string} fontHinting - Font hinting
 * @property {string} macrosSettings - Macros settings
 */
```

#### PdfAdvancedSettings

```javascript
/**
 * @typedef {AdvancedSettingsBase} PdfAdvancedSettings
 */
```

## Example

### Word

```javascript
const { FileMenu } = require("lib"); // Import the FileMenu module from the library

// Create a new file with the specified format
Tester.createFile("docx");

// Input text into the file
Tester.input("Example");

// Download the document as a specific format
FileMenu.downloadAs("docx");

// Save a copy of the document in a specific format
FileMenu.saveCopyAs("docx");

// Rename the current document
FileMenu.rename("test2");

// Create a new document with the specified template
FileMenu.createNew("Blank");

// Protect the document with password settings
FileMenu.protect({
    addPassword: { password: "123", repeatPassword: "123" }, // Add a password
    changePassword: { password: "321", repeatPassword: "321" }, // Change the password
    deletePassword: true, // Delete the existing password
});

// Add or modify properties of the document
FileMenu.addProperties({
    addProperty: { title: "test", type: "Number", value: "123" }, // Add a custom property
    author: "test1", // Set the author
    title: "test1", // Set the title
    tags: "test1", // Set tags
    subject: "test2", // Set the subject
    comment: "test2", // Add a comment
});

// Retrieve and display document information
const document_info = FileMenu.getDocumentInfo();
console.log(document_info);

// Set advanced settings for the document
FileMenu.setAdvancedSettings({
    editing: {
        autosave: false, // Disable autosave
        showPasteOptions: false, // Hide paste options
        useSmart: false, // Disable smart suggestions
    },
    collab: {
        coEditingMode: "Strict", // Set co-editing mode to strict
        showTrack: "Show by hover in tooltips", // Show track changes by hovering
        realTimeChanges: "View none", // Disable real-time change view
        showComments: true, // show comments
        showResolved: true, // Show resolved comments
    },
    proofing: {
        spellCheck: true, // Enable spell checking
        ignoreUpper: false, // Do not ignore uppercase words
        ignoreWithNumber: false, // Do not ignore words with numbers
        autoCorrect: {
            math: {
                replaceAsType: true, // Replace as you type
                correctReplace: "!", // Correct and replace specific input
                correctBy: "@", // Correct input based on another rule
                methodButton: "Add", // Specify the action for the method button
            },
            recognized: {
                recFind: "test", // Recognize specific terms
                methodButton: "Add", // Specify the action for the method button
            },
            autoFormat: {
                smartQuotes: false, // Disable smart quotes
                dash: false, // Disable hyphen-to-dash replacement
                hyperlinks: false, // Disable automatic hyperlinks
                doubleSpace: true, // Add period after double-space
                bulletedList: false, // Disable automatic bulleted lists
                numberedList: false, // Disable automatic numbered lists
            },
            autoCorrect: {
                sentences: false, // Do not capitalize the first letter of sentences
                tableCells: false, // Do not capitalize the first letter of table cells
                language: "Русский (Россия)", // Set language for auto-correct
                dontCap: "b.", // Exclude specific terms from capitalization
                methodButton: "Add", // Specify the action for the method button
            },
        },
    },
    appearance: {
        theme: "Dark", // Set the interface theme to dark
        tabStyle: "Line", // Use line-style tabs
        darkMode: true, // Enable dark mode
        useToolbarColor: true, // Use toolbar color for tabs background
    },
    workspace: {
        turnOnScreen: true, // Enable screen reader support
        alignment: false, // Disable alignment guides
        useAlt: false, // Disable Alt key navigation
        quickAccess: {
            save: false, // Hide save button in quick access
            print: false, // Hide print button in quick access
            undo: false, // Hide undo button in quick access
            redo: false, // Hide redo button in quick access
        },
        unit: "Inch", // Set unit of measurement to inches
        zoomValue: "300%", // Set default zoom value
        fontHinting: "as OS X", // Set font hinting style
        macrosSettings: "Enable all", // Enable all macros
    },
});

// click on the File button
FileMenu.clickFileMenu();

// Save after autosave disabled
FileMenu.save();

// Close the document
Tester.close();
```

### Pdf

```javascript
// import filemenu lib
const { FileMenu } = require("lib");
// create pdf test file
Tester.createFile("pdf");
//click save button in filemenu
Tester.input("Example");
FileMenu.save();
// download pdf file
FileMenu.downloadAs("pdf");
// save cope as pdf
FileMenu.saveCopyAs("pdf");
// rename file
FileMenu.rename("test2");

FileMenu.protect({
    addPassword: { password: "123", repeatPassword: "123" }, // step 1 - add password
    changePassword: { password: "321", repeatPassword: "321" }, // step 2 - change password
    deletePassword: true, // step 3 delete password
});

// add properties in filemenu
FileMenu.addProperties({
    addProperty: { title: "test", type: "Number", value: "123" },
    author: "test1",
    title: "test1",
    tags: "test1",
    subject: "test2",
    comment: "test2",
});
// get file document info
const docInfo = FileMenu.getDocumentInfo();
console.log(docInfo);
// set advanced settings
FileMenu.setAdvancedSettings({
    // change Editing and saving settings
    editing: { autosave: false, showPasteOptions: false, useSmart: false },
    // change Collaboration settings
    collab: {
        coEditingMode: "Strict",
        showTrack: "Show by hover in tooltips",
        realTimeChanges: "View none",
        showComments: true,
        showResolved: true,
    },
    // change Proofing settings
    proofing: {
        spellCheck: true,
        ignoreUpper: false,
        ignoreWithNumber: false,
        autoCorrect: {
            math: { replaceAsType: true, correctReplace: "!", correctBy: "@", methodButton: "Add" },
            recognized: { recFind: "test", methodButton: "Add" },
            autoFormat: {
                smartQuotes: false,
                dash: false,
                hyperlinks: false,
                doubleSpace: true,
                bulletedList: false,
                numberedList: false,
            },
            autoCorrect: {
                sentences: false,
                tableCells: false,
                language: "Русский (Россия)",
                dontCap: "b.",
                methodButton: "Add",
            },
        },
    },
    // change Appearance settings
    appearance: { theme: "Dark", tabStyle: "Line", darkMode: true, useToolbarColor: true },
    // change workspace settings
    workspace: {
        turnOnScreen: true,
        alignment: false,
        useAlt: false,
        quickAccess: { save: false, print: false, undo: false, redo: false },
        unit: "Inch",
        zoomValue: "300%",
        fontHinting: "as OS X",
        macrosSettings: "Enable all",
    },
});
// close test
Tester.close();
```

### Cell

```javascript
const { FileMenu } = require("lib"); // Import the FileMenu module from the library

// Create a new file in the "xlsx" format
Tester.createFile("xlsx");

// Save the current spreadsheet document
FileMenu.save();

// Download the spreadsheet in "xlsx" format
FileMenu.downloadAs("xlsx");

// Save a copy of the spreadsheet in "xlsx" format
FileMenu.saveCopyAs("xlsx");

// Rename the spreadsheet file to "test2"
FileMenu.rename("test2");

// Create a new blank spreadsheet
FileMenu.createNew("Blank");

// Protect the spreadsheet with password options
FileMenu.protect({
    addPassword: { password: "123", repeatPassword: "123" }, // Add a new password
    changePassword: { password: "321", repeatPassword: "321" }, // Change the password
    deletePassword: true, // Remove the password protection
});

// Add or modify properties of the spreadsheet
FileMenu.addProperties({
    addProperty: { title: "test", type: "Number", value: "123" }, // Add a custom property
    author: "test1", // Set the author of the document
    title: "test1", // Set the title of the document
    tags: "test1", // Add tags for the document
    subject: "test2", // Define the subject of the document
    comment: "test2", // Add a comment to the document
});

// Configure advanced settings for the spreadsheet
FileMenu.setAdvancedSettings({
    editing: {
        autosave: false, // Disable automatic saving
        showPasteOptions: false, // Disable paste options
        showTooltip: false, // Disable tooltips
    },
    collab: {
        coEditingMode: "Strict", // Set co-editing mode to strict
        showComments: true, // show comments in the document
        showResolved: true, // Display resolved comments
    },
    proofing: {
        ignoreUpper: false, // Do not ignore uppercase words during proofing
        ignoreWithNumber: false, // Do not ignore words with numbers
        dictLang: "German – Germany", // Set the dictionary language for proofing
        autoCorrect: {
            math: {
                replaceAsType: true, // Replace math symbols as you type
                correctReplace: "!", // Specify the replacement symbol
                correctBy: "@", // Specify the corrected symbol
                methodButton: "Add", // Action for adding the correction
            },
            recognized: {
                recFind: "test", // Add recognized terms for auto-correction
                methodButton: "Add", // Specify the action for adding terms
            },
            autoFormat: {
                hyperlinks: false, // Disable automatic hyperlink detection
                includeNewRows: false, // Exclude new rows from auto-formatting
            },
        },
    },
    appearance: {
        theme: "Dark", // Set the UI theme to dark mode
        tabStyle: "Line", // Use line-style tabs
        useToolbarColor: true, // Apply toolbar color to tabs background
    },
    workspace: {
        turnOnScreen: true, // Enable screen reader support
        r1c1: true, // Enable R1C1 reference style
        useAlt: false, // Disable Alt key navigation shortcuts
        snappedToGrid: true, // Enable snap-to-grid for alignment
        quickAccess: {
            save: false, // Hide the save button in quick access toolbar
            print: false, // Hide the print button in quick access toolbar
            undo: false, // Hide the undo button in quick access toolbar
            redo: false, // Hide the redo button in quick access toolbar
        },
        unit: "Inch", // Set the measurement unit to inches
        zoomValue: "300%", // Set default zoom level to 300%
        fontHinting: "as OS X", // Apply font hinting style similar to macOS
        macrosSettings: "Enable All", // Enable all macros
    },
    regionalSettings: {
        formulaLang: "Danish", // Set the formula language to Danish
        region: "Czech – Czech Republic", // Set the regional settings
        useSep: false, // Disable custom separators
        decimalSep: ",", // Set the decimal separator
        thousandSep: ".", // Set the thousand separator
    },
    calculating: {
        useDateSystem: true, // Enable the date system for calculations
        enableIter: true, // Enable iterative calculations
        maxIter: 50, // Set the maximum number of iterations
        maxChange: 0.002, // Set the maximum change value for iterations
    },
});

// Close the spreadsheet
Tester.close();
```

### Slide

```javascript
const { FileMenu } = require("lib"); // Import the FileMenu module from the library

// Create a new presentation file in the "pptx" format
Tester.createFile("pptx");

// Add initial content to the presentation
Tester.input("Example");

// Save the current presentation
FileMenu.save();

// Download the presentation in "pptx" format
FileMenu.downloadAs("pptx");

// Save a copy of the presentation in "pptx" format
FileMenu.saveCopyAs("pptx");

// Rename the presentation file to "test2"
FileMenu.rename("test2");

// Create a new blank presentation
FileMenu.createNew("Blank");

// Protect the presentation with password options
FileMenu.protect({
    addPassword: { password: "123", repeatPassword: "123" }, // Add a new password
    changePassword: { password: "321", repeatPassword: "321" }, // Change the password
    deletePassword: true, // Remove password protection
});

// Add or modify properties of the presentation
FileMenu.addProperties({
    addProperty: { title: "test", type: "Number", value: "123" }, // Add a custom property
    author: "test1", // Set the author of the document
    title: "test1", // Set the title of the presentation
    tags: "test1", // Add tags to the presentation
    subject: "test2", // Define the subject of the presentation
    comment: "test2", // Add a comment to the presentation
});

// Retrieve and display document information
FileMenu.getDocumentInfo();

// Configure advanced settings for the presentation
FileMenu.setAdvancedSettings({
    editing: {
        autosave: false, // Disable automatic saving
        showPasteOptions: false, // Disable paste options
    },
    collab: {
        coEditingMode: "Strict", // Set co-editing mode to strict
    },
    proofing: {
        spellCheck: true, // Enable spell checking
        ignoreUpper: false, // Do not ignore uppercase words during proofing
        ignoreWithNumber: false, // Do not ignore words with numbers
        autoCorrect: {
            math: {
                replaceAsType: true, // Replace math symbols as you type
                correctReplace: "!", // Specify the replacement symbol
                correctBy: "@", // Specify the corrected symbol
                methodButton: "Add", // Action for adding the correction
            },
            recognized: {
                recFind: "test", // Add recognized terms for auto-correction
                methodButton: "Add", // Specify the action for adding terms
            },
            autoFormat: {
                smartQuotes: false, // Disable smart quotes auto-formatting
                dash: false, // Disable automatic dash formatting
                hyperlinks: false, // Disable automatic hyperlink detection
                doubleSpace: true, // Enable double-space correction
                bulletedList: false, // Disable automatic bulleted lists
                numberedList: false, // Disable automatic numbered lists
            },
            autoCorrect: {
                sentences: false, // Disable automatic sentence capitalization
                tableCells: false, // Disable automatic table cell capitalization
                language: "Русский (Россия)", // Set the language for auto-correction
                dontCap: "b.", // Do not capitalize specific abbreviation
                methodButton: "Add", // Specify the action for adding corrections
            },
        },
    },
    appearance: {
        theme: "Dark", // Set the UI theme to dark mode
        tabStyle: "Line", // Use line-style tabs
        useToolbarColor: true, // Apply toolbar color to tabs background
    },
    workspace: {
        turnOnScreen: true, // Enable screen reader support
        alignment: false, // Disable grid alignment
        useAlt: false, // Disable Alt key navigation shortcuts
        quickAccess: {
            save: false, // Hide the save button in the quick access toolbar
            print: false, // Hide the print button in the quick access toolbar
            undo: false, // Hide the undo button in the quick access toolbar
            redo: false, // Hide the redo button in the quick access toolbar
        },
        unit: "Inch", // Set the measurement unit to inches
        zoomValue: "300%", // Set default zoom level to 300%
        fontHinting: "as OS X", // Apply font hinting style similar to macOS
        macrosSettings: "Enable All", // Enable all macros
    },
});

// Close the presentation
Tester.close();
```
