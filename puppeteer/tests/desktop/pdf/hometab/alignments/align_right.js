// This test verifies that the right alignment is correctly applied to the text in a PDF editor.

const { FileMenu, Verification, TextForm } = require("lib");

Tester.createFile("pdf");
Tester.input("Align right test");

TextForm.clickAlignRight();

FileMenu.downloadAs("pdf");

// Todo pdf verification
// Verification.openFile();
// Verification.check("word/document.xml", "//w:jc/@w:val", "center");

// console.log(Verification.isSuccess());

Tester.close();
