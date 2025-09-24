const { FileMenu, EditPdf, ToolMenuThumbnails, ViewToolbarHome } = require("lib");

Tester.openFile("pdf/headings.pdf");

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
    ToolMenuThumbnails.clickThumbnailsMenu();
    Tester.keyDown("ControlLeft");
    Tester.keyPress("C");
    Tester.keyPress("V");
    Tester.keyUp("ControlLeft");
    FileMenu.save();

    // get current thumbnail number for user1
    let currentThumbnailNumberOne = ToolMenuThumbnails.getCurrentThumbnailNumber();
    console.log(`currentThumbnailNumbeOne before goto: ${currentThumbnailNumberOne}`);
    if (currentThumbnailNumberOne !== 2) {
        throw new Error("Incorrect currentThumbnailNumberOne");
    }

    const countThumbnailsOne = ToolMenuThumbnails.getCountThumbnails();
    console.log(`countThumbnailsOne: ${countThumbnailsOne}`);
});

user2.doSync(async function () {
    Tester.waitUpdates();
    FileMenu.save();
    Tester.waitAutosave();
    ViewToolbarHome.setNextPage();
    // get current thumbnail number for user2
    let currentThumbnailNumberTwo = ToolMenuThumbnails.getCurrentThumbnailNumber();
    console.log(`currentThumbnailNumberTwo before goto: ${currentThumbnailNumberTwo}`);
    if (currentThumbnailNumberTwo !== 2) {
        throw new Error("Incorrect currentThumbnailNumberTwo");
    }

    const countThumbnailsTwo = ToolMenuThumbnails.getCountThumbnails();
    console.log(`countThumbnailsTwo: ${countThumbnailsTwo}`);
});

user1.wait();
user2.wait();

Tester.close();
