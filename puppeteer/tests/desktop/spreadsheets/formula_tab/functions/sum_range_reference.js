/**
 * Check: wizard keeps ranges as-is.
 * SUM(A1:A3) → A4; value 6.
 */
const { FileMenu, Functions, Verification } = require("lib");

Tester.createFile("xlsx");
Tester.input("1");
Tester.keyPress("Enter");
Tester.input("2");
Tester.keyPress("Enter");
Tester.input("3");
Tester.keyPress("Enter"); // now A4

Functions.insertFunction({ functionName: "SUM", parameters: ["A1:A3"] });
Tester.keyPress("Enter");

FileMenu.downloadAs("xlsx");
Verification.openFile();
Verification.check("xl/worksheets/sheet1.xml", "//row[4]/c[@r='A4']/f", "SUM(A1:A3)");
Verification.check("xl/worksheets/sheet1.xml", "//row[4]/c[@r='A4']/v", "6");

console.log(Verification.isSuccess());
Tester.close();
