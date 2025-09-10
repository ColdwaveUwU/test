// This test verifies that the center alignment is correctly applied to the text in a document editor.

const { FileMenu, Verification, TextForm } = require("lib");

Tester.createFile("docx");
Tester.input("Align center test");

TextForm.clickAlignCenter();

FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:jc/@w:val", "center");

console.log(Verification.isSuccess());

Tester.close();
