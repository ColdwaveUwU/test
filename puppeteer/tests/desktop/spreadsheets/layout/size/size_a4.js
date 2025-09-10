const { PageSize, FileMenu, Verification } = require("lib");

Tester.createFile("xlsx");

PageSize.setSize("A4");

FileMenu.downloadAs("xlsx");

Verification.openFile();
Verification.check("xl/worksheets/sheet1.xml", "boolean(//worksheet/pageSetup[@paperSize='9'])", true);

console.log(Verification.isSuccess());
Tester.close();
