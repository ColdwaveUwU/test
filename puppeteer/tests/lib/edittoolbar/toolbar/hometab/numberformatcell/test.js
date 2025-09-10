// Include the Toolbar library
const { NumberFormatCell } = require("lib");
// Open the file new.xlsx
Tester.createFile("xlsx");
// Select Scientific number format
NumberFormatCell.setFormat("Scientific");
// Number input with Scientific number format
Tester.input("123");
Tester.keyPress("Tab");
// Set Accounting style by click on button
NumberFormatCell.clickAccountingStyle();
// Number input with Accounting style
Tester.input("123");
Tester.keyPress("Tab");
// Set € Euro accounting style
NumberFormatCell.setAccountingStyle("€ Euro");
// Number input with € Euro accounting style
Tester.input("123");
Tester.keyPress("Tab");
// Set Percent style
NumberFormatCell.clickPercentStyle();
// Number input with Percent style
Tester.input("123");
Tester.keyPress("Tab");
// Set Comma style
NumberFormatCell.clickCommaStyle();
// Number input with Comma style
Tester.input("123");
Tester.keyPress("Tab");
//Number input to check Decrease decimal and Increase decimal
Tester.input("123");
Tester.keyPress("ArrowDown");
Tester.keyPress("ArrowUp");
//Increase decimal 2 times
NumberFormatCell.clickIncreaseDecimal(2);
//Decrease decimal 2 times
NumberFormatCell.clickDecreaseDecimal(2);
// Close the test example
Tester.close();
