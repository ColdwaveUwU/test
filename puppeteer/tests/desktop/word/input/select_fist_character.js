// https://bugzilla.onlyoffice.com/show_bug.cgi?id=72828

const { FileMenu, TestData, Verification } = require("lib");
Tester.createFile("docx");

Tester.input(TestData.LOREM_IPSUM());
Tester.keyPress("Enter");
Tester.input(TestData.LOREM_IPSUM());
Tester.keyPress("Home");

for (let i = 0; i < 8; i++) {
    Tester.keyPress("ArrowUp");
}

Tester.keyDown("ShiftLeft");
for (let i = 0; i < 6; i++) {
    Tester.keyPress("ArrowDown");
}
Tester.keyUp("ShiftLeft");

Tester.keyDown("ControlLeft");
Tester.keyPress("B");
Tester.keyUp("ControlLeft");
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "count(//w:p[*]/w:r[*]/w:rPr[*]/w:b[1])", 3);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

Tester.close();
