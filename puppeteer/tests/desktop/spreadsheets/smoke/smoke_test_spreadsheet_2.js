const { NumberFormatCell, FileMenu, Verification } = require("lib");
Tester.createFile("xlsx");

Tester.input("123");
Tester.keyPress("ArrowUp");
NumberFormatCell.setFormat("Number");
Tester.keyPress("Tab");

Tester.input("123");
Tester.keyPress("ArrowUp");
NumberFormatCell.setAccountingStyle("Euro");
Tester.keyPress("Tab");

FileMenu.downloadAs("xlsx");
Verification.openFile();

Verification.check("xl/styles.xml", "//xf[2]/@numFmtId", "2");
Verification.check("xl/styles.xml", "//xf[2]/@applyNumberFormat", "1");
Verification.check("xl/worksheets/sheet1.xml", "//c[1]/@s", "1");

Verification.check("xl/styles.xml", "//numFmt[1]/@numFmtId", "164");
Verification.check("xl/styles.xml", "//numFmt[1]/@formatCode", "_-* #,##0.00\\ [$€-407]_-;\\-* #,##0.00\\ [$€-407]_-;_-* \"-\"??\\ [$€-407]_-;_-@_-");
Verification.check("xl/styles.xml", "//xf[3]/@numFmtId", "164");
Verification.check("xl/worksheets/sheet1.xml", "//c[2]/@s", "2");

console.log(Verification.isSuccess());

Tester.close();
