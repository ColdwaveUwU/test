const { NumberFormatCell, FileMenu, Verification } = require("lib");
Tester.createFile("xlsx");

NumberFormatCell.setFormat("Number");
Tester.input("123");
Tester.keyPress("Tab");

NumberFormatCell.setFormat("Scientific");
Tester.input("123");
Tester.keyPress("Tab");

NumberFormatCell.setFormat("Accounting");
Tester.input("123");
Tester.keyPress("Tab");

NumberFormatCell.setFormat("Currency");
Tester.input("123");
Tester.keyPress("Tab");

NumberFormatCell.setFormat("Short Date");
Tester.input("123");
Tester.keyPress("Tab");

NumberFormatCell.setFormat("Long Date");
Tester.input("123");
Tester.keyPress("Tab");

NumberFormatCell.setFormat("Time");
Tester.input("123");
Tester.keyPress("Tab");

NumberFormatCell.setFormat("Percentage");
Tester.input("123");
Tester.keyPress("Tab");

NumberFormatCell.setFormat("Fraction");
Tester.input("123");
Tester.keyPress("Tab");

NumberFormatCell.setFormat("Text");
Tester.input("123");

FileMenu.downloadAs("xlsx");
Verification.openFile();

Verification.check("xl/styles.xml", "//xf[2]/@numFmtId", "2");
Verification.check("xl/worksheets/sheet1.xml", "//c[1]/@s", "1");

Verification.check("xl/styles.xml", "//xf[3]/@numFmtId", "11");
Verification.check("xl/worksheets/sheet1.xml", "//c[2]/@s", "2");

Verification.check("xl/styles.xml", "//numFmt[1]/@numFmtId", "164");
Verification.check("xl/styles.xml", "//numFmt[1]/@formatCode", "_([$$-9]* #,##0.00_);_([$$-9]* \\(#,##0.00\\);_([$$-9]* \"-\"??_);_(@_)");
Verification.check("xl/styles.xml", "//xf[4]/@numFmtId", "164");
Verification.check("xl/worksheets/sheet1.xml", "//c[3]/@s", "3");

Verification.check("xl/styles.xml", "//numFmt[2]/@numFmtId", "165");
Verification.check("xl/styles.xml", "//numFmt[2]/@formatCode", "[$$-9]#,##0.00");
Verification.check("xl/styles.xml", "//xf[5]/@numFmtId", "165");
Verification.check("xl/worksheets/sheet1.xml", "//c[4]/@s", "4");

Verification.check("xl/styles.xml", "//xf[6]/@numFmtId", "14");
Verification.check("xl/worksheets/sheet1.xml", "//c[5]/@s", "5");

Verification.check("xl/styles.xml", "//numFmt[3]/@numFmtId", "166");
Verification.check("xl/styles.xml", "//numFmt[3]/@formatCode", "[$-F800]dddd\\,\\ mmmm\\ d\\,\\ yyyy");
Verification.check("xl/styles.xml", "//xf[7]/@numFmtId", "166");
Verification.check("xl/worksheets/sheet1.xml", "//c[6]/@s", "6");

Verification.check("xl/styles.xml", "//numFmt[4]/@numFmtId", "167");
Verification.check("xl/styles.xml", "//numFmt[4]/@formatCode", "[$-F400]h:mm:ss AM/PM");
Verification.check("xl/styles.xml", "//xf[8]/@numFmtId", "167");
Verification.check("xl/worksheets/sheet1.xml", "//c[7]/@s", "7");

Verification.check("xl/styles.xml", "//xf[9]/@numFmtId", "10");
Verification.check("xl/worksheets/sheet1.xml", "//c[8]/@s", "8");

Verification.check("xl/styles.xml", "//xf[10]/@numFmtId", "12");
Verification.check("xl/worksheets/sheet1.xml", "//c[9]/@s", "9");

Verification.check("xl/styles.xml", "//xf[11]/@numFmtId", "49");
Verification.check("xl/worksheets/sheet1.xml", "//c[10]/@s", "10");

console.log(Verification.isSuccess());

Tester.close();
