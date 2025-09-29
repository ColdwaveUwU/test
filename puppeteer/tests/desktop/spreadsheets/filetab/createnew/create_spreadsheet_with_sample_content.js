// This test verifies creating a new spreadsheet with sample content
const { FileMenu, Verification } = require("lib");

const fileName = "xlsx";

Tester.createFile(fileName);

FileMenu.createNew("sample");

FileMenu.downloadAs("xlsx");

Verification.openFile();

const worksheetPath = "xl/worksheets/sheet1.xml";
const cellDataXpath = "//c/v";
Verification.check(worksheetPath, cellDataXpath, "1");

if (Verification.isSuccess()) {
    console.log("Spreadsheet with sample content created and verified successfully - contains cell data");
} else {
    const filePath = "xl/sharedStrings.xml";
    const stringXpath = "//t";
    Verification.check(filePath, stringXpath, "Sample");

    if (Verification.isSuccess()) {
        console.log("Spreadsheet with sample content created and verified successfully - contains shared strings");
    } else {
        throw new Error("Sample content template verification failed - no sample data found");
    }
}

Tester.close();
