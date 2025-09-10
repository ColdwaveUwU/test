const { PageSize, FileMenu, Verification } = require("lib");

Tester.createFile("xlsx");

PageSize.setSize("US Legal");

FileMenu.downloadAs("xlsx");

Verification.openFile();
Verification.check("xl/worksheets/sheet1.xml", "boolean(//worksheet/pageSetup[@paperSize='5'])", true);

console.log(Verification.isSuccess());
Tester.close();
