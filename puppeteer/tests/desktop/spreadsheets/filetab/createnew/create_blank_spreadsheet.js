// This test verifies creating a new document using the specific "Blank Spreadsheet" template
const { FileMenu, Verification } = require("lib");

const fileName = "xlsx";
const inputText = "BlankSpreadsheetTemplateTest";

Tester.createFile(fileName);

FileMenu.createNew("Blank");

Tester.input(inputText);

FileMenu.downloadAs("xlsx");

Verification.openFile();
const filePath = "xl/sharedStrings.xml";
const textXpath = "//si/t[text()='" + inputText + "']";
Verification.check(filePath, textXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("New spreadsheet using 'Blank Spreadsheet' template does not contain the expected text");
}

console.log("Spreadsheet using 'Blank Spreadsheet' template created and verified successfully");

Tester.close();
