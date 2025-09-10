/**
 * Test: Insert NOT(TRUE) via function wizard and verify both formula and result
 */
const { FileMenu, Functions, Verification } = require("lib");

// 1. Create a new spreadsheet (.xlsx)
Tester.createFile("xlsx");

// 2. Insert the NOT function with parameter TRUE
Functions.insertFunction({
    functionName: "NOT",
    parameters: ["TRUE"],
});

// 3. Download the spreadsheet as .xlsx
FileMenu.downloadAs("xlsx");

// 4. Open the downloaded file for verification
Verification.openFile();

// 5. Verify that the formula in cell A1 is "NOT(TRUE)"
Verification.check("xl/worksheets/sheet1.xml", "//row[1]/c[@r='A1']/f", "NOT(TRUE)");

// 6. Verify the cached value of the formula result (FALSE → 0 in Excel)
Verification.check("xl/worksheets/sheet1.xml", "//row[1]/c[@r='A1']/v", "0");

// 7. Log verification result and close the test
console.log(Verification.isSuccess());
Tester.close();
