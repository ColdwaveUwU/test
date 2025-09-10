/**
 * Test: Create a new spreadsheet, add Sheet2, insert a number into Sheet2!A1,
 * then on Sheet1 insert ABS(Sheet2!A1) and verify that the formula text is correct.
 */
const { FileMenu, Functions, Verification } = require("lib");

// 1) Create a new spreadsheet (xlsx)
Tester.createFile("xlsx");

// 2) Add a new sheet (will usually be named "Sheet2")
Tester.keyPress("Alt"); // Open Alt menu
Tester.keyPress("X"); // Add a new sheet

// 3) On the new sheet, input a number into A1
Tester.input("25"); // Now Sheet2!A1 contains 25

// 4) Switch back to Sheet1
Tester.keyDown("Control");
Tester.keyPress("PageUp"); // Move to the previous sheet
Tester.keyUp("Control");

// 5) Insert ABS formula referencing Sheet2!A1
//    If your UI uses a name with space (e.g., "Sheet 2"), use "'Sheet 2'!A1" instead.
Functions.insertFunction({
    functionName: "ABS",
    parameters: ["Sheet2!A1"],
});
Tester.keyPress("Enter");

// 6) Download the file and verify the formula text in A1 on Sheet1
FileMenu.downloadAs("xlsx");
Verification.openFile();

// Change to "ABS('Sheet 2'!A1)" if the actual sheet name contains a space
Verification.check("xl/worksheets/sheet1.xml", "//row[1]/c[@r='A1']/f", "ABS(Sheet2!A1)");

// 7) Output the verification result and close the test
console.log(Verification.isSuccess());
Tester.close();
