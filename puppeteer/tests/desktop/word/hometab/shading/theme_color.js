// This test verifies that shading from the set of theme colors (black, 5% lighter) is correctly applied to the text.

const { Color, TextForm, FileMenu, Verification } = require("lib");

Tester.createFile("docx");
Tester.input("Shading test theme color");

TextForm.clickShading({
    type: Color.Type.Theme,
    index: 1,
    subIndex: 5, // Black, 5% lighter from the theme colors set
});

FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:shd/@w:color", "0d0d0d");

console.log(Verification.isSuccess());

Tester.close();
