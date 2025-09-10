// This test verifies that setting a specific font size works correctly in a spreadsheet
const { Font, Verification, FileMenu } = require("lib");
const fileName = "xlsx";
const inputText = "FontSetSizeTest";
const fontSize = "56";

Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

// Set specific font size
Font.setFontSize(fontSize);

FileMenu.downloadAs("xlsx");

Verification.openFile();

Verification.check("xl/styles.xml", "//font[2]/sz[1]/@val", fontSize + ".000000");
if (!Verification.isSuccess()) {
    throw new Error("Font size was not set correctly");
}

Tester.close();
