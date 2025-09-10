// This test verifies that the left alignment is correctly applied to the text in a spreadsheet editor.

const { FileMenu, Verification, TextForm } = require("lib");

Tester.createFile("xlsx");
Tester.input("Left");

Tester.keyPress("ArrowDown");
Tester.keyPress("ArrowUp");

TextForm.clickAlignRight();
TextForm.clickAlignLeft();

FileMenu.downloadAs("xlsx");

Verification.openFile();
Verification.check("xl/styles.xml", "//cellXfs/xf[2]/alignment/@horizontal", "left");

console.log(Verification.isSuccess());

Tester.close();
