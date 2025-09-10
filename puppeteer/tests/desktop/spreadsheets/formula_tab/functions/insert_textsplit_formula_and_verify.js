/**
 * https://bugzilla.onlyoffice.com/show_bug.cgi?id=60489
 * Test: Inserts TEXTSPLIT via Formula → Function, using "1,2,3" in A1,
 * verifies split result into A2, B2, C2.
 */

const { FileMenu, Functions, Verification } = require("lib");

// 1. Create a new spreadsheet
Tester.createFile("xlsx");

// 2. Input "1,2,3" into cell A1
Tester.input("1,2,3");
Tester.keyPress("Enter");

// 3. Insert TEXTSPLIT(A1, ",") using formula insertion
Functions.insertFunction({
    functionName: "TEXTSPLIT",
    parameters: ["A1", ","],
});
Tester.keyPress("Enter");

// 4. Download the document as .xlsx
FileMenu.downloadAs("xlsx");

// 5. Verify that A2 = 1, B2 = 2, C2 = 3
Verification.openFile();
Verification.check("xl/worksheets/sheet1.xml", "//row[2]/c[@r='A2']/v", "1");
Verification.check("xl/worksheets/sheet1.xml", "//row[2]/c[@r='B2']/v", "2");
Verification.check("xl/worksheets/sheet1.xml", "//row[2]/c[@r='C2']/v", "3");

// 6. Log result and close
console.log(Verification.isSuccess());
Tester.close();
