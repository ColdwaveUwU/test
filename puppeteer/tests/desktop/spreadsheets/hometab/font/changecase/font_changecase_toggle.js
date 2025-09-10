// This test verifies that the Toggle case change functionality works correctly in a spreadsheet
const { Font, Verification, FileMenu } = require("lib");
const fileName = "xlsx";
const inputText = "Toggle Case Test";
const expectedText = "tOGGLE cASE tEST";

Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

Font.clickChangeCase("tOGGLE cASE");

FileMenu.downloadAs("xlsx");

Verification.openFile();
Verification.check("xl/sharedStrings.xml", "//si[1]/t[1]/text()[1]", expectedText);
if (!Verification.isSuccess()) {
    throw new Error("Toggle case change was not applied correctly");
}

Tester.close();
