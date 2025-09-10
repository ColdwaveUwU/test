// This test verifies that the center alignment is correctly applied to the text in a PDF editor via hotkeys.

const { FileMenu, Verification } = require("lib");

Tester.createFile("pdf");
Tester.input("Align center test");

Tester.keyDown("ControlLeft");
Tester.keyPress("E"); // Apply Center Alignment
Tester.keyUp("ControlLeft");

FileMenu.downloadAs("pdf");

// Todo pdf verification
// Verification.openFile();
// Verification.check("word/document.xml", "//w:jc/@w:val", "center");

// console.log(Verification.isSuccess());

Tester.close();
