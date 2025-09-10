// This test verifies that the Lower case change functionality works correctly in a spreadsheet
const { Font, Verification, FileMenu } = require("lib");
const fileName = "xlsx";
const inputText = "LOWER CASE TEST";
const expectedText = "lower case test";

Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.clickChangeCase("lowercase");

FileMenu.downloadAs("xlsx");

Verification.openFile();
// Check that text has been changed to lower case
Verification.check("xl/sharedStrings.xml", "//si[1]/t[1]/text()[1]", expectedText);
if (!Verification.isSuccess()) {
    throw new Error("Lower case change was not applied correctly");
}

Tester.close();
