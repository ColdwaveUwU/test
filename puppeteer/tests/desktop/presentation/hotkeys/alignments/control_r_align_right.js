// This test verifies that the right alignment is correctly applied to the text in a presentation editor via hotkeys.

const { FileMenu, Verification } = require("lib");

Tester.createFile("pptx");
Tester.input("Align right test");

Tester.keyDown("ControlLeft");
Tester.keyPress("R"); // Apply Right Alignment
Tester.keyUp("ControlLeft");

FileMenu.downloadAs("pptx");

Verification.openFile();
Verification.check("ppt/slides/slide1.xml", "//a:pPr[1]/@algn", "r");

console.log(Verification.isSuccess());

Tester.close();
