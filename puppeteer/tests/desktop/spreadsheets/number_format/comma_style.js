const { NumberFormatCell, FileMenu, Verification } = require("lib");
Tester.createFile("xlsx");

NumberFormatCell.clickCommaStyle();
Tester.input("123");

FileMenu.downloadAs("xlsx");
Verification.openFile();

Verification.check("xl/styles.xml", "//numFmt[1]/@numFmtId", "164");
Verification.check("xl/styles.xml", "//numFmt[1]/@formatCode", "_(* #,##0.00_);_(* \\(#,##0.00\\);_(* \"-\"??_);_(@_)");
Verification.check("xl/styles.xml", "//xf[2]/@numFmtId", "164");
Verification.check("xl/worksheets/sheet1.xml", "//c[1]/@s", "1");

console.log(Verification.isSuccess());

Tester.close();
