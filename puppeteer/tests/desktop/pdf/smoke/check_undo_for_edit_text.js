//https://bugzilla.onlyoffice.com/show_bug.cgi?id=74633
const { EditPdf, AppTitle, FileMenu } = require("lib");

Tester.openFile("pdf/demo.pdf");
EditPdf.clickEditPdf();
EditPdf.editText();
Tester.sleep(600); //wait change dom
Tester.keyDown("Control");
Tester.keyPress("Z");
Tester.keyUp("Control");
Tester.sleep(600);
const isNotDisabled = Tester.checkSelector("#slot-btn-edittext .disabled");
if (isNotDisabled) {
    throw new Error("The 'disabled' class is present");
}

Tester.keyDown("Control");
Tester.keyPress("Y");
Tester.keyUp("Control");
Tester.sleep(600);
const isDisabled = Tester.checkSelector("#slot-btn-edittext .disabled");
if (!isDisabled) {
    throw new Error("The 'disabled' class is missing");
}

AppTitle.clickUndoButton();
Tester.sleep(600);
const isNotDisabledForButton = Tester.checkSelector("#slot-btn-edittext .disabled");
if (isNotDisabledForButton) {
    throw new Error("The 'disabled' class is present for button");
}

AppTitle.clickRedoButton();
Tester.sleep(600);
const isDisabledForButton = Tester.checkSelector("#slot-btn-edittext .disabled");
if (!isDisabledForButton) {
    throw new Error("The 'disabled' class is missing for button");
}

FileMenu.downloadAs("pdf");

Tester.close();
