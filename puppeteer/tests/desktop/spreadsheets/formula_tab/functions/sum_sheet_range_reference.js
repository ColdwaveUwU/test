/**
 * Test: Create a new spreadsheet, add Sheet2, fill A1:B2 with values,
 * then on Sheet1 insert SUM(Sheet2!A1:B2) via the function wizard
 * and verify both the formula text and the calculated result.
 */
const { FileMenu, Functions, Verification } = require("lib");

// 1) Create a new spreadsheet (xlsx)
Tester.createFile("xlsx");

// 2) Add a new sheet (usually named "Sheet2")
Tester.keyPress("Alt"); // Open Alt menu
Tester.keyPress("X"); // Add a new sheet

// 3) Fill A1:B2 with values 1, 2, 3, 4
Tester.input("1");
Tester.keyPress("Tab");
Tester.input("2");
Tester.keyPress("Enter");
Tester.input("3");
Tester.keyPress("Tab");
Tester.input("4");

// 4) Switch back to Sheet1
Tester.keyDown("Control");
Tester.keyPress("PageUp"); // Go to previous sheet (Sheet1)
Tester.keyUp("Control");

// 5) Insert SUM formula with a sheet-qualified range
//    If the sheet name contains a space, e.g., "Sheet 2", use "'Sheet 2'!A1:B2".
Functions.insertFunction({
    functionName: "SUM",
    parameters: ["Sheet2!A1:B2"],
});
Tester.keyPress("Enter");

// 6) Download and verify both formula text and value in Sheet1!A1
FileMenu.downloadAs("xlsx");
Verification.openFile();
Verification.check("xl/worksheets/sheet1.xml", "//row[1]/c[@r='A1']/f", "SUM(Sheet2!A1:B2)");
Verification.check("xl/worksheets/sheet1.xml", "//row[1]/c[@r='A1']/v", "10");

// 7) Print verification result and close
console.log(Verification.isSuccess());
Tester.close();
