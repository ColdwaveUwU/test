// This test verifies that the Standard font color is correctly applied to the entered text in a spreadsheet
const { Font, Verification, FileMenu, Color } = require("lib");
const fileName = "xlsx";
const inputText = "FontColorStandardTest";
const colorIndex = 5; // Green color

Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

Font.clickFontColor({ type: Color.Type.Standard, index: colorIndex });

FileMenu.downloadAs("xlsx");

Verification.openFile();
Verification.check("xl/styles.xml", "//font[2]/color[1]/@rgb", "FF00B050");
if (!Verification.isSuccess()) {
    throw new Error("Standard font color was not applied correctly");
}

Tester.close();
