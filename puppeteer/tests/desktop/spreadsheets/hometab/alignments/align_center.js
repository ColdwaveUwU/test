// This test verifies that the center alignment is correctly applied to the text in a spreadsheet editor.

const { FileMenu, Verification, TextForm } = require("lib");

Tester.createFile("xlsx");
Tester.input("Center");

Tester.keyPress("ArrowDown");
Tester.keyPress("ArrowUp");

TextForm.clickAlignCenter();

FileMenu.downloadAs("xlsx");

Verification.openFile();
Verification.check("xl/styles.xml", "//cellXfs/xf[2]/alignment/@horizontal", "center");

console.log(Verification.isSuccess());

Tester.close();
