/**
 * Test: Creates a new spreadsheet, inserts SIN(A1) formula into A2,
 * and verifies both formula and calculated result.
 */
const { FileMenu, Functions, Verification } = require("lib");

// 1. Create a new spreadsheet (xlsx)
Tester.createFile("xlsx");

// 2. Input the value 0.5 into cell A1
Tester.input("0.5");
Tester.keyPress("Enter");

// 3. Insert SIN(A1) formula into cell A2
Functions.insertFunction({
    functionName: "SIN",
    parameters: ["A1"],
});
Tester.keyPress("Enter");

// 4. Download the file
FileMenu.downloadAs("xlsx");

// 5. Verify XML content of the saved file
Verification.openFile();
Verification.check("xl/worksheets/sheet1.xml", "//row[2]/c[@r='A2']/f", "SIN(A1)");
Verification.check("xl/worksheets/sheet1.xml", "//row[2]/c[@r='A2']/v", "0.47942553860420301");

// 6. Print verification result and close the test
console.log(Verification.isSuccess());
Tester.close();
