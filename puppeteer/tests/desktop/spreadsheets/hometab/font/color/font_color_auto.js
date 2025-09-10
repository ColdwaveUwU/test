// This test verifies that the Auto font color is correctly applied to the entered text in a spreadsheet
const { Font, Verification, FileMenu, Color } = require("lib");
const fileName = "xlsx";
const inputText = "FontColorAutoTest";

Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

// First apply custom color
Font.clickFontColor({
    type: Color.Type.Custom,
    r: 255,
    g: 50,
    b: 100,
});

Font.clickFontColor({ type: Color.Type.Auto });

FileMenu.downloadAs("xlsx");

Verification.openFile();
Verification.check("xl/styles.xml", "boolean(//font[2]/color[1])", false);
if (!Verification.isSuccess()) {
    throw new Error("Auto font color was not applied correctly");
}

Tester.close();
