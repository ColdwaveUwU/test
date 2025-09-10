// This test verifies that the left alignment is correctly applied to the text in a document editor.

const { FileMenu, Verification, TextForm } = require("lib");

Tester.createFile("docx");
Tester.input("Align left test");

TextForm.clickAlignLeft();
TextForm.clickAlignLeft();

FileMenu.downloadAs("docx");

Verification.openFile(); 
Verification.check("word/document.xml", "//w:jc/@w:val", "left");

console.log(Verification.isSuccess());

Tester.close();