// This test verifies that the justify alignment is correctly applied to the text in a document editor.

const { FileMenu, Verification, TextForm } = require("lib");

Tester.createFile("docx");
Tester.input("Justified test");

TextForm.clickJustified();

FileMenu.downloadAs("docx");

Verification.openFile(); 
Verification.check("word/document.xml", "//w:jc/@w:val", "both");

console.log(Verification.isSuccess());

Tester.close();