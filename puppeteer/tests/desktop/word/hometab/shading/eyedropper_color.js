// This test verifies that shading with a color chosen using the eyedropper tool (white) is correctly applied to the text.

const { Color, TextForm, FileMenu, Verification } = require("lib");

Tester.createFile("docx");
Tester.input("Shading test eyedroper color");

TextForm.clickShading({
    type: Color.Type.EyeDropper,
    x: 100,
    y: 100, // Coordinates where the eyedropper tool is clicked for white color
});

FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:shd/@w:color", "ffffff");

console.log(Verification.isSuccess());

Tester.close();
