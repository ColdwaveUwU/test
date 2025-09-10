const { Font, TestData, Color, FileMenu, Verification } = require("lib");
Tester.createFile("xlsx");

Font.clickBold();
Tester.input(TestData.getCellAutoIndex());
Tester.keyPress("Tab");

Font.clickItalic();
Tester.input(TestData.getCellAutoIndex());
Tester.keyPress("Tab");

Font.clickUnderline();
Tester.input(TestData.getCellAutoIndex());
Tester.keyPress("Tab");

Font.clickBold();
Tester.input(TestData.getCellAutoIndex());
Tester.keyPress("ArrowUp");

Tester.keyPress("Tab");
Tester.input(TestData.getCellAutoIndex());
Tester.keyPress("ArrowUp");
Font.clickItalic();

Tester.keyPress("Tab");
Tester.input(TestData.getCellAutoIndex());
Tester.keyPress("ArrowUp");
Font.clickUnderline();

Tester.keyPress("Tab");
Font.clickBold();
Font.clickItalic();
Tester.input(TestData.getCellAutoIndex());

Tester.keyPress("Tab");
Font.clickItalic();
Font.clickUnderline();
Tester.input(TestData.getCellAutoIndex());

Tester.keyPress("Tab");
Font.clickBold();
Font.clickUnderline();
Tester.input(TestData.getCellAutoIndex());

Tester.keyPress("Tab");
Font.clickBold();
Font.clickItalic();
Font.clickUnderline();
Tester.input(TestData.getCellAutoIndex());

Tester.keyPress("Tab");
Font.clickFillColor({ type: Color.Type.Standard, index: 4 });
Tester.input(TestData.getCellAutoIndex());

Tester.keyPress("Tab");
Font.clickFontColor({ type: Color.Type.Standard, index: 5 });
Tester.input(TestData.getCellAutoIndex());

Tester.keyPress("Tab");
Font.selectFont("Verdana");
Tester.click("#ce-cell-content");
Tester.input(TestData.getCellAutoIndex());

Tester.keyPress("Tab");
Font.setFontSize("14");
Tester.input(TestData.getCellAutoIndex());

FileMenu.downloadAs("xlsx");
Verification.openFile();
Verification.check("xl/styles.xml", "boolean(//font[2]/b[1])", true);
Verification.check("xl/sharedStrings.xml", "//si[1]/t[1]/text()[1]", "Cell1");
Verification.check("xl/worksheets/sheet1.xml", "//c[1]/@s", "1");

Verification.check("xl/styles.xml", "boolean(//font[3]/i[1])", true);
Verification.check("xl/sharedStrings.xml", "//si[2]/t[1]/text()[1]", "Cell2");
Verification.check("xl/worksheets/sheet1.xml", "//c[2]/@s", "2");

Verification.check("xl/styles.xml", "boolean(//font[4]/u[1])", true);
Verification.check("xl/sharedStrings.xml", "//si[3]/t[1]/text()[1]", "Cell3");
Verification.check("xl/worksheets/sheet1.xml", "//c[3]/@s", "3");

Verification.check("xl/sharedStrings.xml", "//si[4]/t[1]/text()[1]", "Cell4");
Verification.check("xl/worksheets/sheet1.xml", "//c[4]/@s", "1");

Verification.check("xl/sharedStrings.xml", "//si[5]/t[1]/text()[1]", "Cell5");
Verification.check("xl/worksheets/sheet1.xml", "//c[5]/@s", "2");

Verification.check("xl/sharedStrings.xml", "//si[6]/t[1]/text()[1]", "Cell6");
Verification.check("xl/worksheets/sheet1.xml", "//c[6]/@s", "3");

Verification.check("xl/styles.xml", "boolean(//font[5]/b[1])", true);
Verification.check("xl/styles.xml", "boolean(//font[5]/i[1])", true);
Verification.check("xl/sharedStrings.xml", "//si[7]/t[1]/text()[1]", "Cell7");
Verification.check("xl/worksheets/sheet1.xml", "//c[7]/@s", "4");

Verification.check("xl/styles.xml", "boolean(//font[6]/i[1])", true);
Verification.check("xl/styles.xml", "boolean(//font[6]/u[1])", true);
Verification.check("xl/sharedStrings.xml", "//si[8]/t[1]/text()[1]", "Cell8");
Verification.check("xl/worksheets/sheet1.xml", "//c[8]/@s", "5");

Verification.check("xl/styles.xml", "boolean(//font[7]/b[1])", true);
Verification.check("xl/styles.xml", "boolean(//font[7]/u[1])", true);
Verification.check("xl/sharedStrings.xml", "//si[9]/t[1]/text()[1]", "Cell9");
Verification.check("xl/worksheets/sheet1.xml", "//c[9]/@s", "6");

Verification.check("xl/styles.xml", "boolean(//font[8]/b[1])", true);
Verification.check("xl/styles.xml", "boolean(//font[8]/i[1])", true);
Verification.check("xl/styles.xml", "boolean(//font[8]/u[1])", true);
Verification.check("xl/sharedStrings.xml", "//si[10]/t[1]/text()[1]", "Cell10");
Verification.check("xl/worksheets/sheet1.xml", "//c[10]/@s", "7");

Verification.check("xl/styles.xml", "//fill[3]//fgColor[1]/@indexed", "5");
Verification.check("xl/sharedStrings.xml", "//si[11]/t[1]/text()[1]", "Cell11");
Verification.check("xl/worksheets/sheet1.xml", "//c[11]/@s", "8");

Verification.check("xl/sharedStrings.xml", "//si[12]/t[1]/text()[1]", "Cell12");
Verification.check("xl/styles.xml", "//font[9]/color[1]/@rgb", "FF00B050");
Verification.check("xl/worksheets/sheet1.xml", "//c[12]/@s", "9");

Verification.check("xl/sharedStrings.xml", "//si[13]/t[1]/text()[1]", "Cell13");
Verification.check("xl/styles.xml", "//font[10]/name[1]/@val", "Verdana");
Verification.check("xl/worksheets/sheet1.xml", "//c[13]/@s", "10");

Verification.check("xl/sharedStrings.xml", "//si[14]/t[1]/text()[1]", "Cell14");
Verification.check("xl/styles.xml", "//font[11]/sz[1]/@val", "14.000000");
Verification.check("xl/worksheets/sheet1.xml", "//c[14]/@s", "11");

console.log(Verification.isSuccess());

Tester.close();
