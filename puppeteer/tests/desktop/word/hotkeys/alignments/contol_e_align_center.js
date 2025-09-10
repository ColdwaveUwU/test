// This test verifies that the center alignment is correctly applied to the text in a document editor via hotkeys.

const { FileMenu, Verification } = require("lib");

Tester.createFile("docx");
Tester.input("Align center test");

Tester.keyDown("ControlLeft");
Tester.keyPress("E"); // Apply Center Alignment
Tester.keyUp("ControlLeft");

FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:jc/@w:val", "center");

console.log(Verification.isSuccess());

Tester.close();
