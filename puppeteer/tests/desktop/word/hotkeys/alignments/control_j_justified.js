// This test verifies that the justify alignment is correctly applied to the text in a document editor via hotkeys.

const { FileMenu, Verification } = require("lib");

Tester.createFile("docx");
Tester.input("Justified test");

Tester.keyDown("ControlLeft");
Tester.keyPress("J"); // Apply Justified
Tester.keyUp("ControlLeft");

FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:jc/@w:val", "both");

console.log(Verification.isSuccess());

Tester.close();
