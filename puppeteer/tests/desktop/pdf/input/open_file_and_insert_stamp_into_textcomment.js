//https://bugzilla.onlyoffice.com/show_bug.cgi?id=73350
//https://bugzilla.onlyoffice.com/show_bug.cgi?id=73131

const { ToolbarComment, ViewToolbarComment, FileMenu } = require("lib");

Tester.openFile("pdf/ONLYOFFICE_Sample_Document_PDF.pdf");

ViewToolbarComment.clickTextComment();
Tester.input("12345");
ToolbarComment.selectStamp();
ToolbarComment.selectStamp("Complete"); // Select the 'Complete' stamp
FileMenu.downloadAs("pdf");
Tester.close();
