// This test verifies that the right alignment is correctly applied to the text in a PDF editor via hotkeys.

const { FileMenu, Verification } = require("lib");

Tester.createFile("pdf");
Tester.input("Align right test");

Tester.keyDown("ControlLeft");
Tester.keyPress("R"); // Apply Right Alignment
Tester.keyUp("ControlLeft");

FileMenu.downloadAs("pdf");

// Todo pdf verification
// Verification.openFile();
// Verification.check("word/document.xml", "//w:jc/@w:val", "right");

// console.log(Verification.isSuccess());

Tester.close();
