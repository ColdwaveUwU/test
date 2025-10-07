//This test verifies the functionality of deleting layouts in the Slide Master view

const { SlideView, ToolMenuThumbnails } = require("lib");

Tester.createFile("pptx");

SlideView.setSlideMasterView();
ToolMenuThumbnails.selectThumbnailsMenu();
ToolMenuThumbnails.goToThumbnail(3);
for (let i = 0; i < 10; i++) {
    Tester.keyPress("Delete");
}
currentThumbnailNumber = ToolMenuThumbnails.getCurrentThumbnailNumber();
console.log(`currentThumbnailNumber after goto: ${currentThumbnailNumber}`);
if (currentThumbnailNumber !== 2) {
    throw new Error("Incorrect currentThumbnailNumber");
}

Tester.close();
