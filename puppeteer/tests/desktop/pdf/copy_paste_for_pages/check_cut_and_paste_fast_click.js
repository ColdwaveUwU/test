//https://bugzilla.onlyoffice.com/show_bug.cgi?id=75604
const { EditPdf, ToolMenuThumbnails, FileMenu } = require("lib");

Tester.openFile("pdf/test.pdf");

EditPdf.clickEditPdf();
ToolMenuThumbnails.setThumbnailsOption({ highlight: true, size: 7 });
ToolMenuThumbnails.clickThumbnailsMenu();

Tester.keyDown("ControlLeft");
Tester.keyPress("X");
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

FileMenu.downloadAs("pdf");

Tester.close();
