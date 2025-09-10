/**
 * Test: Insert NUMPAGES field and verify total pages = 2
 */
const { FileMenu, PageHeaderFooter, Verification } = require("lib");

Tester.createFile("docx");
Tester.keyDown("Control");
Tester.keyPress("Enter");
Tester.keyUp("Control");
PageHeaderFooter.insertPagesNumber();
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check({ containsText: "2" });
Tester.close();
