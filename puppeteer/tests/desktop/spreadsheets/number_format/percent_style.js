const { NumberFormatCell, FileMenu, Verification } = require("lib");
Tester.createFile("xlsx");

NumberFormatCell.clickPercentStyle();
Tester.input("123");

FileMenu.downloadAs("xlsx");
Verification.openFile();

Verification.check("xl/styles.xml", "//xf[2]/@numFmtId", "9");
Verification.check("xl/worksheets/sheet1.xml", "//c[1]/@s", "1");

console.log(Verification.isSuccess());

Tester.close();
