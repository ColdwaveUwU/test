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
        autosave: true, // Disable autosave
        showPasteOptions: true, // Hide paste options
    },
    collab: {
        coEditingMode: "strict", // Set co-editing mode to strict
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
        },
    },
    appearance: {
        theme: {
            value: "Dark",
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
        macrosSettings: "Enable All",
    },
});

// Close the presentation
Tester.close();
