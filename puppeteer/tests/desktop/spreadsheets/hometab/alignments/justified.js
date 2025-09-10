// This test verifies that the justify alignment is correctly applied to the text in a spreadsheet editor.

const { FileMenu, Verification, TextForm } = require("lib");

Tester.createFile("xlsx");
Tester.input("Justified");

Tester.keyPress("ArrowDown");
Tester.keyPress("ArrowUp");

TextForm.clickJustified();

FileMenu.downloadAs("xlsx");

Verification.openFile();
Verification.check("xl/styles.xml", "//cellXfs/xf[2]/alignment/@horizontal", "justify");

console.log(Verification.isSuccess());

Tester.close();
