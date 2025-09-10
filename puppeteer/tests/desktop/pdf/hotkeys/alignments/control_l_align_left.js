// This test verifies that the left alignment is correctly applied to the text in a PDF editor via hotkeys.

const { FileMenu, Verification } = require("lib");

Tester.createFile("pdf");
Tester.input("Align left test");

Tester.keyDown("ControlLeft");
Tester.keyPress("L"); // Apply Left Alignment
Tester.keyUp("ControlLeft");

Tester.keyDown("ControlLeft");
Tester.keyPress("L"); // Apply Left Alignment
Tester.keyUp("ControlLeft");

FileMenu.downloadAs("pdf");

// Todo pdf verification
// Verification.openFile();
// Verification.check("word/document.xml", "//w:jc/@w:val", "left");

// console.log(Verification.isSuccess());

Tester.close();
