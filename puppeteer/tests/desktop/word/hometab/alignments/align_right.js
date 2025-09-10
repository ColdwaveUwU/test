// This test verifies that the right alignment is correctly applied to the text in a document editor.

const { FileMenu, Verification, TextForm } = require("lib");

Tester.createFile("docx");
Tester.input("Align right test");

TextForm.clickAlignRight();

FileMenu.downloadAs("docx");

Verification.openFile(); 
Verification.check("word/document.xml", "//w:jc/@w:val", "right");

console.log(Verification.isSuccess());

Tester.close();