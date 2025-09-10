// This test verifies that the Custom font color is correctly applied to the entered text in a spreadsheet
const { Font, Verification, FileMenu, Color } = require("lib");
const fileName = "xlsx";
const inputText = "FontColorCustomTest";
const customColor = { r: 255, g: 128, b: 64 }; // Orange color

Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

Font.clickFontColor({
    type: Color.Type.Custom,
    r: customColor.r,
    g: customColor.g,
    b: customColor.b,
});

FileMenu.downloadAs("xlsx");

Verification.openFile();
Verification.check("xl/styles.xml", "//font[2]/color[1]/@rgb", "FFFF8040");
if (!Verification.isSuccess()) {
    throw new Error("Custom font color was not applied correctly");
}

Tester.close();
