// This test verifies that the font size decrease functionality works correctly in a spreadsheet
const { Font, Verification, FileMenu } = require("lib");
const fileName = "xlsx";
const inputText = "FontDecreaseTest";

Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

Font.clickDecFont();

FileMenu.downloadAs("xlsx");

Verification.openFile();
Verification.check("xl/styles.xml", "//font[2]/sz[1]/@val", "10.000000");
if (!Verification.isSuccess()) {
    throw new Error("Font size was not decreased correctly");
}

Tester.close();
