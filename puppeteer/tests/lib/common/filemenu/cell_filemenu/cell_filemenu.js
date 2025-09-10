const { FileMenu } = require("lib"); // Import the FileMenu module from the library

// Create a new file in the "xlsx" format
Tester.createFile("xlsx");

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
