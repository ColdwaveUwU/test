//https://bugzilla.onlyoffice.com/show_bug.cgi?id=70559
const { EditPdf, FileMenu, StatusBar } = require("lib");

Tester.openFile("pdf/demo.pdf");

EditPdf.insertPage("Insert blank page after");
EditPdf.clickEditPdf(false);
StatusBar.goToPage(1);
EditPdf.insertPage("Insert blank page before");
FileMenu.save();
Tester.reloadPage();

Tester.close();
