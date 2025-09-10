//Checking the insertion of the blank page after the source page
const { EditPdf, BlankPagePdf, ToolMenuThumbnails, ViewToolbarHome } = require("lib");

Tester.openFile("pdf/test.pdf");

ToolMenuThumbnails.setThumbnailsOption({ highlight: true, size: 7 });
EditPdf.clickEditPdf();
BlankPagePdf.blankPage("Insert blank page after");
EditPdf.clickEditPdf(false);

//checking that the insertion occurred after the original page
const isDisabledPrevPage = Tester.checkSelector("#slot-btn-prev-page .disabled");
if (isDisabledPrevPage) {
    throw new Error("The 'disabled' class is present");
}

const isDisabledNextPage = Tester.checkSelector("#slot-btn-next-page .disabled");
if (isDisabledNextPage) {
    throw new Error("The 'disabled' class is present");
}

ViewToolbarHome.setLastPage();

// get current thumbnail number
let currentThumbnailNumber = ToolMenuThumbnails.getCurrentThumbnailNumber();
console.log(`currentThumbnailNumber before goto: ${currentThumbnailNumber}`);
if (currentThumbnailNumber !== 3) {
    throw new Error("Incorrect currentThumbnailNumber");
}

const countThumbnails = ToolMenuThumbnails.getCountThumbnails();
console.log(`countThumbnails: ${countThumbnails}`);

Tester.close();
