// This test verifies that the font size increase functionality works correctly in a spreadsheet
const { Font, Verification, FileMenu } = require("lib");
const fileName = "xlsx";
const inputText = "FontIncreaseTest";

Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

// Increment font size
Font.clickIncFont();

FileMenu.downloadAs("xlsx");

Verification.openFile();

Verification.check("xl/styles.xml", "//font[2]/sz[1]/@val", "12.000000");
if (!Verification.isSuccess()) {
    throw new Error("Font size was not increased correctly");
}

Tester.close();
