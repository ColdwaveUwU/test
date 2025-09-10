const { Font } = require("lib");
Tester.createFile("docx");
Font.clickBold();
Tester.keyPress("Enter");

Tester.input("Hello World!");

Tester.keyPress("ArrowLeft");
Tester.keyDown("Shift");
for (let i = 0; i < 5; i++) Tester.keyPress("ArrowLeft");
Tester.keyUp("Shift");

Tester.keyPress("Enter");
Tester.input("Hello World!");
Tester.keyDown("Shift");
for (let i = 0; i < 5; i++) Tester.keyPress("ArrowLeft");
Tester.keyUp("Shift");
Font.clickUnderline();

Tester.close();
