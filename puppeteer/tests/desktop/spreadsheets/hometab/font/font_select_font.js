// This test verifies that selecting a font family works correctly in a spreadsheet
const { Font, Verification, FileMenu} = require("lib");
const fileName = "xlsx";
const inputText = "FontSelectTest";
const fontName = "Verdana";

Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

Font.selectFont(fontName);

FileMenu.downloadAs("xlsx");

Verification.openFile();
Verification.check("xl/styles.xml", "//font[2]/name[1]/@val", fontName);
if (!Verification.isSuccess()) {
    throw new Error("Font family was not selected correctly");
}

Tester.close();
