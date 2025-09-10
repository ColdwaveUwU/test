//https://bugzilla.onlyoffice.com/show_bug.cgi?id=73210
const { ViewToolbarComment } = require("lib");
Tester.openFile("pdf/test.pdf");
ViewToolbarComment.clickTextComment();
Tester.keyDown("Control");
Tester.keyPress("Z");
Tester.keyUp("Control");
Tester.close();
