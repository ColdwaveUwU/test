// This test verifies that the CustomClick font color is correctly applied to the entered text in a spreadsheet
const { Font, Verification, FileMenu, Color } = require("lib");
const fileName = "xlsx";
const inputText = "FontColorCustomClickTest";

Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

Font.clickFontColor({
    type: Color.Type.CustomClick,
    x: 150,
    y: 100,
    hue: 50,
    menuType: "DEFAULT",
});

FileMenu.downloadAs("xlsx");

Verification.openFile();
Verification.check("xl/styles.xml", "boolean(//font[2]/color[1]/@rgb)", true);
if (!Verification.isSuccess()) {
    throw new Error("CustomClick font color was not applied correctly");
}

Tester.close();
