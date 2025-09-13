// This test verifies creating a new blank spreadsheet
const { FileMenu, Verification } = require("lib");

const fileName = "xlsx";
const inputText = "BlankSpreadsheetTest";

Tester.createFile(fileName);

FileMenu.createNew("Blank");

Tester.input(inputText);

FileMenu.downloadAs("xlsx");

Verification.openFile();
const filePath = "xl/sharedStrings.xml";
const textXpath = "//si/t[text()='" + inputText + "']";
Verification.check(filePath, textXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("New blank spreadsheet does not contain the expected text");
}

console.log("Blank spreadsheet created and verified successfully");

Tester.close();
