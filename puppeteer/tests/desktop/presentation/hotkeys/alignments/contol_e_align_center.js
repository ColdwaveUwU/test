// This test verifies that the center alignment is correctly applied to the text in a presentation editor via hotkeys.

const { FileMenu, Verification } = require("lib");

Tester.createFile("pptx");
Tester.input("Align center test");

Tester.keyDown("ControlLeft");
Tester.keyPress("L"); // Apply Left Alignment
Tester.keyUp("ControlLeft");

Tester.keyDown("ControlLeft");
Tester.keyPress("E"); // Apply Center Alignment
Tester.keyUp("ControlLeft");

FileMenu.downloadAs("pptx");

Verification.openFile();
Verification.check("ppt/slides/slide1.xml", "//a:pPr[1]/@algn", "ctr");

console.log(Verification.isSuccess());

Tester.close();
