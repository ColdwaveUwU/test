//https://bugzilla.onlyoffice.com/show_bug.cgi?id=74260
const { EditPdf, ToolMenuThumbnails, ViewToolbarHome, FileMenu } = require("lib");

Tester.openFile("pdf/headings.pdf");

EditPdf.clickEditPdf();
ToolMenuThumbnails.clickThumbnailsMenu();
Tester.click("#thumbnails-list");
Tester.keyDown("ControlLeft");
Tester.keyPress("C");
Tester.keyPress("V");
Tester.keyUp("ControlLeft");

// get current thumbnail number
let currentThumbnailNumber = ToolMenuThumbnails.getCurrentThumbnailNumber();
console.log(`currentThumbnailNumber before goto: ${currentThumbnailNumber}`);
if (currentThumbnailNumber !== 2) {
    throw new Error("Incorrect currentThumbnailNumber");
}

const countThumbnails = ToolMenuThumbnails.getCountThumbnails();
console.log(`countThumbnails: ${countThumbnails}`);

EditPdf.clickEditPdf(false);
ViewToolbarHome.setPrevPage();
FileMenu.downloadAs("pdf");

Tester.close();
