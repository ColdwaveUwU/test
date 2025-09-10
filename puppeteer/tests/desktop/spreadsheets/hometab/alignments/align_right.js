// This test verifies that the right alignment is correctly applied to the text in a spreadsheet editor.

const { FileMenu, Verification, TextForm } = require("lib");

Tester.createFile("xlsx");
Tester.input("Right");

Tester.keyPress("ArrowDown");
Tester.keyPress("ArrowUp");

TextForm.clickAlignRight();

FileMenu.downloadAs("xlsx");

Verification.openFile();
Verification.check("xl/styles.xml", "//cellXfs/xf[2]/alignment/@horizontal", "right");

console.log(Verification.isSuccess());

Tester.close();
