const { EditPdf, ToolMenuThumbnails, ViewToolbarHome } = require("lib");

Tester.openFile("pdf/demo.pdf");

EditPdf.clickEditPdf();
ToolMenuThumbnails.setThumbnailsOption({ highlight: true, size: 7 });
ToolMenuThumbnails.clickThumbnailsMenu();
Tester.keyDown("ControlLeft");
Tester.keyPress("A");
Tester.keyPress("C");
Tester.keyPress("V");
Tester.keyUp("ControlLeft");
EditPdf.clickEditPdf(false);
ViewToolbarHome.setLastPage();

// get current thumbnail number
let currentThumbnailNumber = ToolMenuThumbnails.getCurrentThumbnailNumber();
console.log(`currentThumbnailNumber before goto: ${currentThumbnailNumber}`);
if (currentThumbnailNumber !== 16) {
    throw new Error("Incorrect currentThumbnailNumber");
}

const countThumbnails = ToolMenuThumbnails.getCountThumbnails();
console.log(`countThumbnails: ${countThumbnails}`);

Tester.close();
