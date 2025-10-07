const { EditPdf, ToolMenuThumbnails, ViewToolbarHome, FileMenu, AppTitle } = require("lib");

Tester.openFile("pdf/test.pdf");

EditPdf.clickEditPdf();
ToolMenuThumbnails.selectThumbnailsMenu();

Tester.keyDown("ControlLeft");
Tester.keyPress("X");
Tester.keyUp("ControlLeft");

// get current thumbnail number
let currentThumbnailNumberAfterCut = ToolMenuThumbnails.getCurrentThumbnailNumber();
console.log(`currentThumbnailNumber before goto: ${currentThumbnailNumberAfterCut}`);
if (currentThumbnailNumberAfterCut !== 1) {
    throw new Error("Incorrect currentThumbnailNumber");
}

Tester.keyDown("ControlLeft");
Tester.keyPress("V");
Tester.keyUp("ControlLeft");

// get current thumbnail number
let currentThumbnailNumberAfterPaste = ToolMenuThumbnails.getCurrentThumbnailNumber();
console.log(`currentThumbnailNumber before goto: ${currentThumbnailNumberAfterPaste}`);
if (currentThumbnailNumberAfterPaste !== 2) {
    throw new Error("Incorrect currentThumbnailNumber");
}

EditPdf.clickEditPdf(false);
ViewToolbarHome.setPrevPage();

const isDisabledPrevPage = Tester.checkSelector("#slot-btn-prev-page .disabled");
if (!isDisabledPrevPage) {
    throw new Error("The 'disabled' class is missing");
}

const isActiveNextPage = Tester.checkSelector("#slot-btn-next-page .disabled");
if (isActiveNextPage) {
    throw new Error("The 'disabled' class is present");
}

AppTitle.clickUndoButton();

// get current thumbnail number after undo
let currentThumbnailNumberAfterUndo = ToolMenuThumbnails.getCurrentThumbnailNumber();
console.log(`currentThumbnailNumber before goto: ${currentThumbnailNumberAfterUndo}`);
if (currentThumbnailNumberAfterUndo !== 1) {
    throw new Error("Incorrect currentThumbnailNumber");
}

const disabledPrevPage = Tester.checkSelector("#slot-btn-prev-page .disabled");
if (!disabledPrevPage) {
    throw new Error("The 'disabled' class is missing");
}

const isDisabledNextPage = Tester.checkSelector("#slot-btn-next-page .disabled");
if (!isDisabledNextPage) {
    throw new Error("The 'disabled' class is missing");
}

AppTitle.clickRedoButton();
ViewToolbarHome.setNextPage();

const isActivePrevPage = Tester.checkSelector("#slot-btn-prev-page .disabled");
if (isActivePrevPage) {
    throw new Error("The 'disabled' class is present");
}

const disabledNextPage = Tester.checkSelector("#slot-btn-next-page .disabled");
if (!disabledNextPage) {
    throw new Error("The 'disabled' class is missing");
}

// get current thumbnail number after redo
let currentThumbnailNumberAfterRedo = ToolMenuThumbnails.getCurrentThumbnailNumber();
console.log(`currentThumbnailNumber before goto: ${currentThumbnailNumberAfterRedo}`);
if (currentThumbnailNumberAfterRedo !== 2) {
    throw new Error("Incorrect currentThumbnailNumber");
}

const countThumbnails = ToolMenuThumbnails.getCountThumbnails();
console.log(`countThumbnails: ${countThumbnails}`);

FileMenu.downloadAs("pdf");

Tester.close();
