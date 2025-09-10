// This test verifies that transparent shading is correctly applied to the text.

const { Color, TextForm, FileMenu, Verification } = require("lib");

Tester.createFile("docx");
Tester.input("Transparent shading test");

TextForm.clickShading({
    type: Color.Type.Standard,
    index: 0, // Transparent shading
});

FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:shd/@w:color", "auto");

console.log(Verification.isSuccess());

Tester.close();
