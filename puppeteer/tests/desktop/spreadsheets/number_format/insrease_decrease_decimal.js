const { NumberFormatCell, FileMenu, Verification } = require("lib");
Tester.createFile("xlsx");

Tester.input("123");
Tester.keyPress("ArrowDown");
Tester.keyPress("ArrowUp");
NumberFormatCell.clickIncreaseDecimal();
Tester.keyPress("Tab");

Tester.input("123");
Tester.keyPress("ArrowDown");
Tester.keyPress("ArrowUp");
NumberFormatCell.clickIncreaseDecimal(2);
Tester.keyPress("Tab");

Tester.input("123");
Tester.keyPress("ArrowDown");
Tester.keyPress("ArrowUp");
NumberFormatCell.clickIncreaseDecimal(3);
Tester.keyPress("Tab");

Tester.input("123");
Tester.keyPress("ArrowDown");
Tester.keyPress("ArrowUp");
NumberFormatCell.clickIncreaseDecimal(3);
NumberFormatCell.clickDecreaseDecimal();
Tester.keyPress("Tab");

Tester.input("123");
Tester.keyPress("ArrowDown");
Tester.keyPress("ArrowUp");
NumberFormatCell.clickIncreaseDecimal(3);
NumberFormatCell.clickDecreaseDecimal(2);
Tester.keyPress("Tab");

Tester.input("123");
Tester.keyPress("ArrowDown");
Tester.keyPress("ArrowUp");
NumberFormatCell.clickIncreaseDecimal(3);
NumberFormatCell.clickDecreaseDecimal(3);
Tester.keyPress("Tab");

FileMenu.downloadAs("xlsx");
Verification.openFile();

Verification.check("xl/styles.xml", "//numFmt[1]/@numFmtId", "164");
Verification.check("xl/styles.xml", "//numFmt[1]/@formatCode", "0.0");
Verification.check("xl/styles.xml", "//xf[2]/@numFmtId", "164");
Verification.check("xl/worksheets/sheet1.xml", "//c[1]/@s", "1");

Verification.check("xl/styles.xml", "//xf[3]/@numFmtId", "2");
Verification.check("xl/worksheets/sheet1.xml", "//c[2]/@s", "2");

Verification.check("xl/styles.xml", "//numFmt[2]/@numFmtId", "165");
Verification.check("xl/styles.xml", "//numFmt[2]/@formatCode", "0.000");
Verification.check("xl/styles.xml", "//xf[4]/@numFmtId", "165");
Verification.check("xl/worksheets/sheet1.xml", "//c[3]/@s", "3");

Verification.check("xl/worksheets/sheet1.xml", "//c[4]/@s", "2");

Verification.check("xl/worksheets/sheet1.xml", "//c[5]/@s", "1");

Verification.check("xl/styles.xml", "//xf[5]/@numFmtId", "1");
Verification.check("xl/worksheets/sheet1.xml", "//c[6]/@s", "4");

console.log(Verification.isSuccess());

Tester.close();
