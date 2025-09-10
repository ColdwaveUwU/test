// import ToolMenuThumbnails lib
const { ToolMenuThumbnails } = require("lib");
// open test pdf file
Tester.openFile("pdf/demo.pdf");
// set thumbnails options Thumbnails Settings
ToolMenuThumbnails.setThumbnailsOption({ highlight: true, size: 6 });
// click in Thumbnails list
ToolMenuThumbnails.clickThumbnailsMenu();

// get current thumbnail number
let currentThumbnailNumber = ToolMenuThumbnails.getCurrentThumbnailNumber();
console.log(`currentThumbnailNumber before goto: ${currentThumbnailNumber}`);
if (currentThumbnailNumber !== 1) {
    throw new Error("Incorrect currentThumbnailNumber");
}

// goto 3 thumbnail
ToolMenuThumbnails.goToThumbnail(3);

currentThumbnailNumber = ToolMenuThumbnails.getCurrentThumbnailNumber();
console.log(`currentThumbnailNumber after goto: ${currentThumbnailNumber}`);
if (currentThumbnailNumber !== 3) {
    throw new Error("Incorrect currentThumbnailNumber");
}

const countThumbnails = ToolMenuThumbnails.getCountThumbnails();
console.log(`countThumbnails: ${countThumbnails}`);
Tester.close();
