// This test verifies that the justify alignment is correctly applied to the text in a presentation editor via hotkeys.

const { FileMenu, Verification } = require("lib");

Tester.createFile("pptx");
Tester.input("Justified test");

Tester.keyDown("ControlLeft");
Tester.keyPress("J"); // Apply Justified
Tester.keyUp("ControlLeft");

FileMenu.downloadAs("pptx");

Verification.openFile();
Verification.check("ppt/slides/slide1.xml", "//a:pPr[1]/@algn", "just");

console.log(Verification.isSuccess());

Tester.close();
