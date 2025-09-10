// This test verifies that selecting a font size from dropdown works correctly in a spreadsheet
const { Font, Verification, FileMenu } = require("lib");
const fileName = "xlsx";
const inputText = "FontSelectSizeTest";
const fontSize = "16";

Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

Font.selectFontSize(fontSize);

FileMenu.downloadAs("xlsx");

Verification.openFile();
Verification.check("xl/styles.xml", "//font[2]/sz[1]/@val", fontSize + ".000000");
if (!Verification.isSuccess()) {
    throw new Error("Font size was not selected correctly");
}

Tester.close();
