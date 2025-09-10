//https://bugzilla.onlyoffice.com/show_bug.cgi?id=74662
const { Image, AppTitle } = require("lib");

Tester.createFile("docx");
Image.fromFile("png/testFile.png");
AppTitle.clickUndoButton();
AppTitle.clickRedoButton();
Tester.keyDown("Control");
Tester.keyPress("Z");
Tester.keyPress("Y");
Tester.keyUp("Control");
Tester.close();
