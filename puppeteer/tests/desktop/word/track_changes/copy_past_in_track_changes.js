//https://bugzilla.onlyoffice.com/show_bug.cgi?id=72471
//https://bugzilla.onlyoffice.com/show_bug.cgi?id=73373

const { ReviewChanges } = require("lib");
Tester.openFile("docx/Microsoft-(Demo-Hayden-Management-v2).docx");
// running bug scenario 73373
Tester.keyDown("ControlLeft");
Tester.keyPress("A");
Tester.keyUp("ControlLeft");
Tester.keyDown("ControlLeft");
Tester.keyPress("C");
Tester.keyUp("ControlLeft");
Tester.keyDown("ControlLeft");
Tester.keyPress("V");
Tester.keyUp("ControlLeft");
Tester.keyDown("ControlLeft");
Tester.keyPress("Z");
Tester.keyUp("ControlLeft");
// running bug scenario 72471
Tester.keyPress("PageUp");
Tester.keyDown("ShiftLeft");
for (let i = 0; i < 9; i++) {
    Tester.keyPress("ArrowUp");
}
Tester.keyUp("ShiftLeft");
Tester.keyDown("ControlLeft");
Tester.keyPress("C");
Tester.keyUp("ControlLeft");

ReviewChanges.trackChanges();
Tester.keyDown("ControlLeft");
Tester.keyPress("A");
Tester.keyUp("ControlLeft");
Tester.keyDown("ControlLeft");
Tester.keyPress("V");
Tester.keyUp("ControlLeft");
Tester.close();
