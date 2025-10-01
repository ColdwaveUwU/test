// import filemenu lib
const { FileMenu } = require("lib");
// create pdf test file
Tester.createFile("pdf");
//click save button in filemenu
Tester.input("Example");

// download pdf file
FileMenu.downloadAs("pdf");
// save cope as pdf
FileMenu.saveCopyAs("pdf");
// rename file
FileMenu.rename("test2");

FileMenu.protect("ADD", { password: "123", repeatPassword: "123" }); // Add a password);

// add properties in filemenu
FileMenu.addProperties({ staticElement: { value: "test", title: "Author" } });
// get file document info
const docInfo = FileMenu.getDocumentInfo();
console.log(docInfo);
// set advanced settings
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
// close test
Tester.close();
