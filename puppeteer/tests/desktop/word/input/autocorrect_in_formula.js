// https://bugzilla.onlyoffice.com/show_bug.cgi?id=75994

Tester.openFile("docx/Formulas.docx");
Tester.keyPress("End");
Tester.keyPress("ArrowLeft");
for (let i = 0; i < 3; i++) {
    Tester.keyPress("Backspace");
}
Tester.input("ln |x|");
Tester.keyPress("ArrowRight");
Tester.keyPress("+");

Tester.close();
