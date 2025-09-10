/**
 * Test: Create a spreadsheet, insert a table in A1:B3, then in A5 insert
 * SUM(Table1[Col1]) via the function wizard and verify both formula and result.
 */
const { FileMenu, Functions, Verification } = require("lib");

// 1) Create a new spreadsheet
Tester.createFile("xlsx");

// 2) Fill headers and data for table
Tester.input("Col1");
Tester.keyPress("Tab");
Tester.input("Col2");
Tester.keyPress("Enter");

Tester.input("1");
Tester.keyPress("Tab");
Tester.input("2");
Tester.keyPress("Enter");

Tester.input("3");
Tester.keyPress("Tab");
Tester.input("4");

// 3) Select the range A1:B3 and insert table
Tester.keyDown("Shift");
Tester.keyPress("ArrowUp"); // select row 2
Tester.keyPress("ArrowUp"); // select row 1
Tester.keyPress("ArrowLeft"); // go to column A
Tester.keyUp("Shift");

Tester.keyPress("Alt"); // open Alt menu
Tester.keyPress("I"); // Insert tab
Tester.keyPress("D"); // Insert table
Tester.keyPress("Enter"); // confirm table creation

// 4) Move to A5 (cell below the table)
Tester.keyPress("ArrowDown");
Tester.keyPress("ArrowLeft");
Tester.keyPress("ArrowDown");

// 5) Insert SUM(Table1[Col1])
Functions.insertFunction({
    functionName: "SUM",
    parameters: ["Table1[Col1]"], // if UI uses different name, adjust here
});
Tester.keyPress("Enter");

// 6) Download and verify
FileMenu.downloadAs("xlsx");
Verification.openFile();

// Formula check
Verification.check("xl/worksheets/sheet1.xml", "//row[4]/c[@r='A5']/f", "SUM(Table1[Col1])");

// Result check: 1 + 3 = 4
Verification.check("xl/worksheets/sheet1.xml", "//row[4]/c[@r='A5']/v", "4");

console.log(Verification.isSuccess());
Tester.close();
