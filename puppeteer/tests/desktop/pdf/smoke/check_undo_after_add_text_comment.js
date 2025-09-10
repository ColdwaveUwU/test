//https://bugzilla.onlyoffice.com/show_bug.cgi?id=70334
const { EditPdf, ViewToolbarComment } = require("lib");

Tester.openFile("pdf/demo.pdf");
EditPdf.clickEditPdf();
ViewToolbarComment.clickTextComment("Insert text comment");
Tester.input("Hello");
Tester.keyDown("ControlLeft");
Tester.keyPress("Z");
Tester.keyPress("Z");
Tester.keyPress("Z");
Tester.keyUp("ControlLeft");

Tester.close();
