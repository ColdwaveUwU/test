const { NumberFormatCell, FileMenu, Verification } = require("lib");
Tester.createFile("xlsx");

NumberFormatCell.clickAccountingStyle();
Tester.input("123");
Tester.keyPress("Tab");

NumberFormatCell.setAccountingStyle("$ Dollar");
Tester.input("123");
Tester.keyPress("Tab");

NumberFormatCell.setAccountingStyle("€ Euro");
Tester.input("123");
Tester.keyPress("Tab");

NumberFormatCell.setAccountingStyle("£ Pound");
Tester.input("123");
Tester.keyPress("Tab");

NumberFormatCell.setAccountingStyle("₽ Rouble");
Tester.input("123");
Tester.keyPress("Tab");

NumberFormatCell.setAccountingStyle("¥ Yen");
Tester.sleep(1000);
Tester.input("123");

FileMenu.downloadAs("xlsx");
Verification.openFile();

Verification.check("xl/styles.xml", "//numFmt[1]/@numFmtId", "164");
Verification.check("xl/styles.xml", "//numFmt[1]/@formatCode", "_([$$-9]* #,##0.00_);_([$$-9]* \\(#,##0.00\\);_([$$-9]* \"-\"??_);_(@_)");
Verification.check("xl/styles.xml", "//xf[2]/@numFmtId", "164");
Verification.check("xl/worksheets/sheet1.xml", "//c[1]/@s", "1");

Verification.check("xl/styles.xml", "//numFmt[2]/@numFmtId", "165");
Verification.check("xl/styles.xml", "//numFmt[2]/@formatCode", "_([$$-409]* #,##0.00_);_([$$-409]* \\(#,##0.00\\);_([$$-409]* \"-\"??_);_(@_)");
Verification.check("xl/styles.xml", "//xf[3]/@numFmtId", "165");
Verification.check("xl/worksheets/sheet1.xml", "//c[2]/@s", "2");

Verification.check("xl/styles.xml", "//numFmt[3]/@numFmtId", "166");
Verification.check("xl/styles.xml", "//numFmt[3]/@formatCode", "_-* #,##0.00\\ [$€-407]_-;\\-* #,##0.00\\ [$€-407]_-;_-* \"-\"??\\ [$€-407]_-;_-@_-");
Verification.check("xl/styles.xml", "//xf[4]/@numFmtId", "166");
Verification.check("xl/worksheets/sheet1.xml", "//c[3]/@s", "3");

Verification.check("xl/styles.xml", "//numFmt[4]/@numFmtId", "167");
Verification.check("xl/styles.xml", "//numFmt[4]/@formatCode", "_-[$£-809]* #,##0.00_-;\\-[$£-809]* #,##0.00_-;_-[$£-809]* \"-\"??_-;_-@_-");
Verification.check("xl/styles.xml", "//xf[5]/@numFmtId", "167");
Verification.check("xl/worksheets/sheet1.xml", "//c[4]/@s", "4");

Verification.check("xl/styles.xml", "//numFmt[5]/@numFmtId", "168");
Verification.check("xl/styles.xml", "//numFmt[5]/@formatCode", "_-* #,##0.00\\ [$₽-419]_-;\\-* #,##0.00\\ [$₽-419]_-;_-* \"-\"??\\ [$₽-419]_-;_-@_-");
Verification.check("xl/styles.xml", "//xf[6]/@numFmtId", "168");
Verification.check("xl/worksheets/sheet1.xml", "//c[5]/@s", "5");

Verification.check("xl/styles.xml", "//numFmt[6]/@numFmtId", "169");
Verification.check("xl/styles.xml", "//numFmt[6]/@formatCode", "_-[$¥-411]* #,##0.00_-;\\-[$¥-411]* #,##0.00_-;_-[$¥-411]* \"-\"??_-;_-@_-");
Verification.check("xl/styles.xml", "//xf[7]/@numFmtId", "169");
Verification.check("xl/worksheets/sheet1.xml", "//c[6]/@s", "6");

console.log(Verification.isSuccess());

Tester.close();

