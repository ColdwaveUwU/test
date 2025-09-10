//https://bugzilla.onlyoffice.com/show_bug.cgi?id=75405
const { ToolMenuThumbnails } = require("lib");
Tester.openFile("pptx/PPTCompatTest.pptx");
ToolMenuThumbnails.clickThumbnailsMenu();
Tester.keyPress("ArrowUp");
for (let i = 0; i < 39; i++) {
    Tester.keyPress("Delete");
}
Tester.close();
