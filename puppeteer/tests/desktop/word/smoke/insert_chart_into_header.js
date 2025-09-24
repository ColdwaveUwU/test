//https://bugzilla.onlyoffice.com/show_bug.cgi?id=54545
const { FileMenu, Verification, Chart, PageHeaderFooter } = require("lib");
Tester.createFile("docx");

Tester.input("Test");
Chart.createChart({ groupName: "Pie", chartName: 1 });
Chart.closeEditor();
Tester.keyDown("Control");
Tester.keyPress("A");
Tester.keyPress("C");
Tester.keyUp("Control");
PageHeaderFooter.editHeader("test Header");
Tester.keyDown("Control");
Tester.keyPress("V");
Tester.keyUp("Control");

FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "count(//c:chart[1])", 1);
Verification.check("word/document.xml", "boolean(//w:document[1]/w:body[1]/w:sectPr[1]/w:headerReference[1])", true);
Verification.check("word/document.xml", "//w:document[1]/w:body[1]/w:p[1]/w:r[1]/w:t[1]/text()[1]", "Test");
console.log(Verification.isSuccess());
Tester.close();
