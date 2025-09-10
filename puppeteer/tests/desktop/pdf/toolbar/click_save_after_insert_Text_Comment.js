//https://bugzilla.onlyoffice.com/show_bug.cgi?id=73212
const { ViewToolbarComment } = require("lib");
const { FileMenu } = require("lib");
Tester.openFile("pdf/test.pdf");
ViewToolbarComment.clickTextComment();
FileMenu.save(); 
Tester.close();
