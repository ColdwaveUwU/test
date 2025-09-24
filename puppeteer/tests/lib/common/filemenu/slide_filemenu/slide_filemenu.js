const { FileMenu } = require("lib"); // Import the FileMenu module from the library

// Create a new presentation file in the "pptx" format
Tester.createFile("pptx");

// Add initial content to the presentation
Tester.input("Example");

// Download the presentation in "pptx" format
FileMenu.downloadAs("pptx");

// Save a copy of the presentation in "pptx" format
FileMenu.saveCopyAs("pptx");

// Rename the presentation file to "test2"
FileMenu.rename("test2");

// Create a new blank presentation
FileMenu.createNew("Blank");

// Protect the presentation with password options
FileMenu.protect("ADD", { password: "123", repeatPassword: "123" }); // Add a password);

// Add or modify properties of the presentation
FileMenu.addProperties({ staticElement: { value: "test", title: "Author" } });

// Retrieve and display document information
FileMenu.getDocumentInfo();

// Configure advanced settings for the presentation
FileMenu.setAdvancedSettings({
    editing: {
        autosave: false, // Disable automatic saving
        showPasteOptions: false, // Disable paste options
    },
    collab: {
        coEditingMode: "strict", // Set co-editing mode to strict
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
