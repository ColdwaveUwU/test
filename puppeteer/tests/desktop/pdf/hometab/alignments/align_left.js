// This test verifies that the left alignment is correctly applied to the text in a PDF editor.

const { FileMenu, Verification, TextForm } = require("lib");

Tester.createFile("pdf");
Tester.input("Align left test");

TextForm.clickAlignLeft();
TextForm.clickAlignLeft();

FileMenu.downloadAs("pdf");

// Todo pdf verification
// Verification.openFile();
// Verification.check("word/document.xml", "//w:jc/@w:val", "center");

// console.log(Verification.isSuccess());

Tester.close();
