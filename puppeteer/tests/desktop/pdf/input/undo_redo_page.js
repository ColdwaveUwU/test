//https://bugzilla.onlyoffice.com/show_bug.cgi?id=73975
const { EditPdf } = require("lib");

Tester.openFile("pdf/dkp.pdf");

EditPdf.clickEditPdf();
EditPdf.insertPage("Insert blank page before");
Tester.keyDown("ControlLeft");
Tester.keyPress("Z");
Tester.keyUp("ControlLeft");
Tester.keyDown("ControlLeft");
Tester.keyPress("Y");
Tester.keyUp("ControlLeft");
Tester.close();
