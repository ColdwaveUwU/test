const { Font } = require("lib");
Tester.createFile("Document");

Tester.input("Hello World");
Tester.keyDown("Shift");
for (let i = 0; i < 5; i++) Tester.keyPress("ArrowLeft");
Tester.keyUp("Shift");
Font.clickUnderline();

Tester.close();