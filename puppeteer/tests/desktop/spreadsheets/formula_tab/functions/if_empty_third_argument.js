/**
 * Test: Verify that the function wizard can emit an empty/omitted argument.
 * Formula: IF(A1>0,B1,) should be saved as IF(A1>0,B1) (third argument omitted).
 * Also verifies the calculated result in the target cell.
 */

const { FileMenu, Functions, Verification } = require("lib");

// 1) Create a new spreadsheet
Tester.createFile("xlsx");

// 2) Fill initial data: A1 = 5, B1 = "OK"
Tester.input("5");
Tester.keyPress("Tab");
Tester.input("OK");
Tester.keyPress("Enter");

// 3) Insert IF formula with an empty third argument into A2
Functions.insertFunction({
    functionName: "IF",
    parameters: ["A1>0", "B1", ""], // empty 3rd argument
});
Tester.keyPress("Enter");

// Optional: Force recalculation if needed
Tester.keyPress("F9");

// 4) Download the file
FileMenu.downloadAs("xlsx");

// 5) Verify that the formula in A2 omits the third argument
Verification.openFile();
Verification.check("xl/worksheets/sheet1.xml", "//row[2]/c[@r='A2']/f", "IF(A1>0,B1)");

// 6) Verify that the result matches the expected value from B1
Verification.check("xl/worksheets/sheet1.xml", "//row[2]/c[@r='A2']/v", "OK");

// 7) Output verification result and close test
console.log(Verification.isSuccess());
Tester.close();
