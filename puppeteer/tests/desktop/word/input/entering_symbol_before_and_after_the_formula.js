//https://bugzilla.onlyoffice.com/show_bug.cgi?id=73172
Tester.openFile("docx/Formulas.docx");
Tester.keyPress("-");
Tester.keyPress("ArrowRight");
for (let i = 0; i < 4; i++) Tester.keyPress("ArrowRight");
Tester.keyPress("-");

Tester.close();
