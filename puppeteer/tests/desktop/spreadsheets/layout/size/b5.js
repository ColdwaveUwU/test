const { PageSize, FileMenu, Verification } = require("lib");

Tester.createFile("xlsx");

PageSize.setSize("B5");

FileMenu.downloadAs("xlsx");

Verification.openFile();
Verification.check("xl/worksheets/sheet1.xml", "boolean(//worksheet/pageSetup[@paperSize='13'])", true);

console.log(Verification.isSuccess());
Tester.close();
