// This test verifies that justified alignment is correctly applied to the text when left alignment is applied for the first time in the PDF editor via hotkeys.

const { FileMenu, Verification } = require("lib");

Tester.createFile("pdf");
Tester.input("Justified by align left test");

Tester.keyDown("ControlLeft");
Tester.keyPress("L"); // Apply Left Alignment
Tester.keyUp("ControlLeft");

FileMenu.downloadAs("pdf");

//Todo pdf verification
// Verification.openFile();
// Verification.check("word/document.xml", "//w:jc/@w:val", "both");

// console.log(Verification.isSuccess());

Tester.close();
