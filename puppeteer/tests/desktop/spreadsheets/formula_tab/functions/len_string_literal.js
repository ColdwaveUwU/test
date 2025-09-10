/**
 * Check: wizard keeps text argument in quotes.
 * LEN("Hello") → A1; value should be 5.
 */
const { FileMenu, Functions, Verification } = require("lib");

Tester.createFile("xlsx");
Functions.insertFunction({ functionName: "LEN", parameters: ['"Hello"'] });
Tester.keyPress("Enter");

FileMenu.downloadAs("xlsx");
Verification.openFile();
Verification.check("xl/worksheets/sheet1.xml", "//row[1]/c[@r='A1']/f", 'LEN("Hello")');
Verification.check("xl/worksheets/sheet1.xml", "//row[1]/c[@r='A1']/v", "5");

console.log(Verification.isSuccess());
Tester.close();
