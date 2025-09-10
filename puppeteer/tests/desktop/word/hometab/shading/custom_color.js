// This test verifies that shading with a custom color selected from the More Color dialog (green) is correctly applied to the text.

const { Color, TextForm, FileMenu, Verification } = require("lib");

Tester.createFile("docx");
Tester.input("Shading test custom color");

TextForm.clickShading({
    type: Color.Type.Custom,
    r: 0,
    g: 255,
    b: 0, // Green color
});

FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:shd/@w:color", "00ff00");

console.log(Verification.isSuccess());

Tester.close();
