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

Tester.input("[STAND CONFIG] example: some text for correct saving");

// click on the File button
FileMenu.clickFileMenu();

// Save after autosave disabled
FileMenu.save();

// Close the document
Tester.close();
