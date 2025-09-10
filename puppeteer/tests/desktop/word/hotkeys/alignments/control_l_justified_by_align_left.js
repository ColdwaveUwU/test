// This test verifies that justified alignment is correctly applied to the text when left alignment is applied for the first time in the document editor via hotkeys.

const { FileMenu, Verification } = require("lib");

Tester.createFile("docx");
Tester.input("Justified by align left test");

Tester.keyDown("ControlLeft");
Tester.keyPress("L"); // Apply Left Alignment
Tester.keyUp("ControlLeft");

FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:jc/@w:val", "both");

console.log(Verification.isSuccess());

Tester.close();
