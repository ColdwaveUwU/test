// This test verifies that the justify alignment is correctly applied to the text in a PDF editor via hotkeys.

const { FileMenu, Verification } = require("lib");

Tester.createFile("pdf");
Tester.input("Justified test");

Tester.keyDown("ControlLeft");
Tester.keyPress("J"); // Apply Justified
Tester.keyUp("ControlLeft");

FileMenu.downloadAs("pdf");

// Todo pdf verification
// Verification.openFile();
// Verification.check("word/document.xml", "//w:jc/@w:val", "both");

// console.log(Verification.isSuccess());

Tester.close();
