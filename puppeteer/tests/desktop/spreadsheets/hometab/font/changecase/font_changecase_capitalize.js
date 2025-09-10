// This test verifies that the Capitalize case change functionality works correctly in a spreadsheet
const { Font, Verification, FileMenu } = require("lib");
const fileName = "xlsx";
const inputText = "capitalize test";
const expectedText = "Capitalize Test";

Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

Font.clickChangeCase("Capitalize Each Word");

FileMenu.downloadAs("xlsx");

Verification.openFile();
// Check that text has been changed to capitalize case
Verification.check("xl/sharedStrings.xml", "//si[1]/t[1]/text()[1]", expectedText);
if (!Verification.isSuccess()) {
    throw new Error("Capitalize case change was not applied correctly");
}

Tester.close();
