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
    // change Editing and saving settings
    editing: { autosave: false, showPasteOptions: false, useSmart: false },
    // change Collaboration settings
    collab: {
        coEditingMode: "strict",
        showChanges: "tooltips",
        realTime: "none",
        showComments: false,
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
