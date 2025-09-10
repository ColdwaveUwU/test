//https://bugzilla.onlyoffice.com/show_bug.cgi?id=74397
const { EditPdf, ToolMenuThumbnails, ViewToolbarHome, FileMenu } = require("lib");

Tester.openFile("pdf/test.pdf");

ViewToolbarHome.setNextPage();
ViewToolbarHome.setPrevPage();
EditPdf.clickEditPdf();
ToolMenuThumbnails.setThumbnailsOption({ highlight: true, size: 7 });
ToolMenuThumbnails.clickThumbnailsMenu();
Tester.keyDown("ControlLeft");
Tester.keyPress("X");
Tester.keyUp("ControlLeft");

// get current thumbnail number
let currentThumbnailNumber = ToolMenuThumbnails.getCurrentThumbnailNumber();
console.log(`currentThumbnailNumber before goto: ${currentThumbnailNumber}`);
if (currentThumbnailNumber !== 1) {
    throw new Error("Incorrect currentThumbnailNumber");
}

const countThumbnails = ToolMenuThumbnails.getCountThumbnails();
console.log(`countThumbnails: ${countThumbnails}`);

EditPdf.clickEditPdf(false);

const isDisabledPrevPage = Tester.checkSelector("#slot-btn-prev-page .disabled");
if (!isDisabledPrevPage) {
    throw new Error("The 'disabled' class is missing");
}

const isDisabledNextPage = Tester.checkSelector("#slot-btn-next-page .disabled");
if (!isDisabledNextPage) {
    throw new Error("The 'disabled' class is missing");
}

FileMenu.downloadAs("pdf");

Tester.close();
