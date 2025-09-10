// This test verifies that shading from the set of standard colors (red) is correctly applied to the text.

const { Color, TextForm, FileMenu, Verification } = require("lib");

Tester.createFile("docx");
Tester.input("Shading test standard color");

TextForm.clickShading({
    type: Color.Type.Standard,
    index: 2, // Red color from the standard colors set
});

FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:shd/@w:color", "ff0000");

console.log(Verification.isSuccess());

Tester.close();
