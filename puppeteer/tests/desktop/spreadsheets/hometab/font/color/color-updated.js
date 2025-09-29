// This test verifies that the CustomClick font color is correctly applied to the entered text in a spreadsheet
const { Font, Verification, FileMenu, Color } = require("lib");
const fileName = "xlsx";
const inputText = "FontColorTest";

Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
const customColor = { r: 255, g: 128, b: 64 }; // Orange color
// Tests for default color menu
Font.clickFontColor({
    type: Color.Type.Theme,
    index: 1,
    subIndex: 5,
});

Font.clickFontColor({
    type: Color.Type.Standard,
    index: 4,
});

Font.clickFontColor({
    type: Color.Type.EyeDropper,
    x: 150,
    y: 100,
});

Font.clickFontColor({
    type: Color.Type.Custom,
    r: customColor.r,
    g: customColor.g,
    b: customColor.b,
});

Font.clickFontColor({
    type: Color.Type.CustomClick,
    x: 150,
    y: 100,
    hue: 50,
});

// Tests for fill color menu
Font.clickFillColor({
    type: Color.Type.Theme,
    index: 1,
    subIndex: 5,
});

Font.clickFillColor({
    type: Color.Type.Standard,
    index: 4,
});

Font.clickFillColor({
    type: Color.Type.EyeDropper,
    x: 150,
    y: 100,
});

Font.clickFillColor({
    type: Color.Type.Custom,
    r: customColor.r,
    g: customColor.g,
    b: customColor.b,
});

Font.clickFillColor({
    type: Color.Type.CustomClick,
    x: 40,
    y: 50,
    hue: 85,
});

Tester.close();
