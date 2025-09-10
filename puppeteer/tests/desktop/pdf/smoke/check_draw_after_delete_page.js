//https://bugzilla.onlyoffice.com/show_bug.cgi?id=73014
const { EditPdf, ViewToolbarComment, FileMenu } = require("lib");

Tester.openFile("pdf/demo.pdf");
EditPdf.clickEditPdf();
EditPdf.deletePage();
ViewToolbarComment.clickComment();
ViewToolbarComment.penOne({ type: 5, x: 50, y: 100, hue: 45 }, 0, 0, 30, 30, "0.5 mm");
FileMenu.downloadAs("pdf");

Tester.close();
