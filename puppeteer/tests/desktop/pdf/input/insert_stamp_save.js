//https://bugzilla.onlyoffice.com/show_bug.cgi?id=72344
const { FileMenu, ToolbarComment } = require("lib");

Tester.openFile("pdf/dkp.pdf");

ToolbarComment.selectStamp();
ToolbarComment.selectStamp("Complete"); // Select the 'Complete' stamp

FileMenu.downloadAs("pdf");

Tester.close();
