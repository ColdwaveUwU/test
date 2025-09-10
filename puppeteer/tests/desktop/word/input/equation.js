//https://bugzilla.onlyoffice.com/show_bug.cgi?id=73173
const { FileMenu} = require("lib");

Tester.openFile("docx/Formulas.docx");
Tester.keyPress("End");
Tester.keyPress("ArrowLeft");
for (let i = 0; i < 2; i++) Tester.keyPress("ArrowLeft");
Tester.keyPress("m");

Tester.close();
