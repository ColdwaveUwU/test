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
