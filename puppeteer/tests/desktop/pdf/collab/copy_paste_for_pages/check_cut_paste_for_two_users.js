const { FileMenu, EditPdf, ToolMenuThumbnails, ViewToolbarHome } = require("lib");

Tester.openFile("pdf/test.pdf");

let collab = Tester.startCollaboration();
let user1 = collab.addUser({
    name: "user1",
    firstName: "name",
    lastName: "lastname",
});

let user2 = collab.addUser({
    name: "user2",
    firstName: "name",
    lastName: "lastname",
});

user1.doSync(async function () {
    FileMenu.setAdvancedSettings({
        collab: {
            coEditingMode: "Strict",
        },
    });
});

user2.doSync(async function () {
    FileMenu.setAdvancedSettings({
        collab: {
            coEditingMode: "Strict",
        },
    });
});

user1.doSync(async function () {
    EditPdf.clickEditPdf();
    ToolMenuThumbnails.setThumbnailsOption({ highlight: true, size: 7 });
    ToolMenuThumbnails.selectThumbnailsMenu();
    Tester.keyDown("ControlLeft");
    Tester.keyPress("X");
    Tester.keyUp("ControlLeft");
    FileMenu.save();

    // get current thumbnail number for user1 after cut
    let currentThumbnailNumberCutOne = ToolMenuThumbnails.getCurrentThumbnailNumber();
    console.log(`currentThumbnailNumbeOne before goto: ${currentThumbnailNumberCutOne}`);
    if (currentThumbnailNumberCutOne !== 1) {
        throw new Error("Incorrect currentThumbnailNumberCutOne");
    }

    const countThumbnailsCutOne = ToolMenuThumbnails.getCountThumbnails();
    console.log(`countThumbnailsCutOne: ${countThumbnailsCutOne}`);
});

user2.doSync(async function () {
    Tester.waitUpdates();
    FileMenu.save();
    Tester.waitAutosave();
    EditPdf.clickEditPdf();
    ToolMenuThumbnails.setThumbnailsOption({ highlight: true, size: 7 });
    ToolMenuThumbnails.selectThumbnailsMenu();

    // get current thumbnail number for user2 after cut
    let currentThumbnailNumberCutTwo = ToolMenuThumbnails.getCurrentThumbnailNumber();
    console.log(`currentThumbnailNumberCutTwo before goto: ${currentThumbnailNumberCutTwo}`);
    if (currentThumbnailNumberCutTwo !== 1) {
        throw new Error("Incorrect currentThumbnailNumberCutTwo");
    }

    const countThumbnailsCutTwo = ToolMenuThumbnails.getCountThumbnails();
    console.log(`countThumbnailsCutTwo: ${countThumbnailsCutTwo}`);
});

user1.doSync(async function () {
    ToolMenuThumbnails.selectThumbnailsMenu();
    Tester.keyDown("ControlLeft");
    Tester.keyPress("V");
    Tester.keyUp("ControlLeft");
    FileMenu.save();

    // get current thumbnail number for user1 after paste
    let currentThumbnailNumberPasteOne = ToolMenuThumbnails.getCurrentThumbnailNumber();
    console.log(`currentThumbnailNumbePasteOne before goto: ${currentThumbnailNumberPasteOne}`);
    if (currentThumbnailNumberPasteOne !== 2) {
        throw new Error("Incorrect currentThumbnailNumberPasteOne");
    }

    const countThumbnailsPasteOne = ToolMenuThumbnails.getCountThumbnails();
    console.log(`countThumbnailsPasteOne: ${countThumbnailsPasteOne}`);
});

user2.doSync(async function () {
    Tester.waitUpdates();
    FileMenu.save();
    Tester.waitAutosave();
    EditPdf.clickEditPdf(false);
    ViewToolbarHome.setNextPage();

    // get current thumbnail number for user2 after paste
    let currentThumbnailNumberPasteTwo = ToolMenuThumbnails.getCurrentThumbnailNumber();
    console.log(`currentThumbnailNumberPasteTwo before goto: ${currentThumbnailNumberPasteTwo}`);
    if (currentThumbnailNumberPasteTwo !== 2) {
        throw new Error("Incorrect currentThumbnailNumberPasteTwo");
    }

    const countThumbnailsPasteTwo = ToolMenuThumbnails.getCountThumbnails();
    console.log(`countThumbnailsPasteTwo: ${countThumbnailsPasteTwo}`);
});

user1.wait();
user2.wait();

Tester.close();
