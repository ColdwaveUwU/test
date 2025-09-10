/**
 * Check: wizard preserves quotes for numeric-looking text.
 * ROUND("123",0) → A1; value should be 123 (exact integer).
 */
const { FileMenu, Functions, Verification } = require("lib");

Tester.createFile("xlsx");
Functions.insertFunction({ functionName: "ROUND", parameters: ['"123"', "0"] });
Tester.keyPress("Enter");

FileMenu.downloadAs("xlsx");
Verification.openFile();
Verification.check("xl/worksheets/sheet1.xml", "//row[1]/c[@r='A1']/f", 'ROUND("123",0)');
Verification.check("xl/worksheets/sheet1.xml", "//row[1]/c[@r='A1']/v", "123");

console.log(Verification.isSuccess());
Tester.close();
