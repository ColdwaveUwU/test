// This test verifies that the Bold style is correctly applied to the entered text in a spreadsheet
const { Font, Verification, FileMenu } = require("lib");
const fileName = "xlsx";
const inputText = "BoldTest";

Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

Font.clickBold();

FileMenu.downloadAs("xlsx");

Verification.openFile();
Verification.check("xl/styles.xml", "boolean(//font[2]/b[1])", true);
if (!Verification.isSuccess()) {
    throw new Error("Bold style was not applied to the text in the exported file");
}

Tester.close();
