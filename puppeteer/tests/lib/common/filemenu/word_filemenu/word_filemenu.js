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
FileMenu.createNew("blank");

// Protect the document with password settings
FileMenu.protect("ADD", { password: "123", repeatPassword: "123" }); // Add a password);

// Add or modify properties of the document
FileMenu.addProperties({ staticElement: { value: "test", title: "Author" } });

// Retrieve and display document information
const document_info = FileMenu.getDocumentInfo();

// Set advanced settings for the document
FileMenu.setAdvancedSettings({
    editing: {
        autosave: true, // Disable autosave
        showPasteOptions: true, // Hide paste options
        useSmart: true, // Disable smart suggestions,
        makeComp: true,
    },
    collab: {
        coEditingMode: "strict", // Set co-editing mode to strict
        showChanges: "tooltips", // Show track changes by hovering
        realTime: "all", // Disable real-time change view
        showComments: true, // Hide comments
        showResolved: true, // Show resolved comments
    },
    proofing: {
        spellCheck: true,
        ignoreUpper: true,
        ignoreNumbers: true,
        autoCorrect: {
            math: {
                asType: true,
                replace: "!!",
                by: "22",
                action: "add",
            },
            recognized: {
                value: "test",
                action: "add",
            },
            autoFormat: {
                replace: {
                    quotes: true,
                    hyphens: true,
                    hyperlinks: true,
                    addPeriod: true,
                },
                apply: { bullet: true, numbered: true },
            },
            autoCorrect: {
                sentences: true,
                cells: true,
                exceptions: "Svenska (Sverige)",
                dontCapitalize: {
                    value: "test",
                    action: "add",
                },
            },
        },
    },
    docContent: {
        numeral: "Hindi",
    },
    appearance: {
        theme: {
            value: "Dark",
            darkMode: true,
        },
        tabStyle: "Fill",
        background: true,
    },
    workspace: {
        turnOnScreen: false,
        aligment: false,
        useAlt: false,
        customQuickAcces: {
            save: false,
            print: false,
            undo: false,
            redo: false,
        },
        unit: "Centimeter",
        zoomValue: "120%",
        fontHint: "Native",
        macrosSettings: "Enable all",
    },
});

// Close the document
Tester.close();
