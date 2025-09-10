const { PageSize, FileMenu, Verification } = require("lib");

Tester.createFile("xlsx");

PageSize.setSize("Envelope Choukei 3");

FileMenu.downloadAs("xlsx");

Verification.openFile();
Verification.check("xl/worksheets/sheet1.xml", "boolean(//worksheet/pageSetup[@paperSize='73'])", true);

console.log(Verification.isSuccess());
Tester.close();
