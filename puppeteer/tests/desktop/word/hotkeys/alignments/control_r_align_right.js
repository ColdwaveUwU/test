// This test verifies that the right alignment is correctly applied to the text in a document editor via hotkeys.

const { FileMenu, Verification } = require("lib");

Tester.createFile("docx");
Tester.input("Align right test");

Tester.keyDown("ControlLeft");
Tester.keyPress("R"); // Apply Right Alignment
Tester.keyUp("ControlLeft");

FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:jc/@w:val", "right");

console.log(Verification.isSuccess());

Tester.close();
