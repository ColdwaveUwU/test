// This test verifies that the left alignment is correctly applied to the text in a presentation editor via hotkeys.

const { FileMenu, Verification } = require("lib");

Tester.createFile("pptx");
Tester.input("Align left test");

Tester.keyDown("ControlLeft");
Tester.keyPress("L"); // Apply Left Alignment
Tester.keyUp("ControlLeft");

FileMenu.downloadAs("pptx");

Verification.openFile();
Verification.check("ppt/slides/slide1.xml", "//a:pPr[1]/@algn", "l");

console.log(Verification.isSuccess());

Tester.close();
