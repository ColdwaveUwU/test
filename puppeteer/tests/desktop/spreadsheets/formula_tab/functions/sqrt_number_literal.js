/**
 * Check: wizard puts numeric literal (no quotes).
 * SQRT(9) → A1; value should be 3 (exact integer).
 */
const { FileMenu, Functions, Verification } = require("lib");

Tester.createFile("xlsx");
Functions.insertFunction({ functionName: "SQRT", parameters: ["9"] });
Tester.keyPress("Enter");

FileMenu.downloadAs("xlsx");
Verification.openFile();
Verification.check("xl/worksheets/sheet1.xml", "//row[1]/c[@r='A1']/f", "SQRT(9)");
Verification.check("xl/worksheets/sheet1.xml", "//row[1]/c[@r='A1']/v", "3");

console.log(Verification.isSuccess());
Tester.close();
