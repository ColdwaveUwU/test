/**
 * Check: wizard treats plain A1 as cell reference (no quotes).
 * A1 = -10; A2 = ABS(A1) → value 10.
 */
const { FileMenu, Functions, Verification } = require("lib");

Tester.createFile("xlsx");
Tester.input("-10");
Tester.keyPress("Enter"); // A2

Functions.insertFunction({ functionName: "ABS", parameters: ["A1"] });
Tester.keyPress("Enter");

FileMenu.downloadAs("xlsx");
Verification.openFile();
Verification.check("xl/worksheets/sheet1.xml", "//row[2]/c[@r='A2']/f", "ABS(A1)");
Verification.check("xl/worksheets/sheet1.xml", "//row[2]/c[@r='A2']/v", "10");

console.log(Verification.isSuccess());
Tester.close();
