const { PageOrientation, FileMenu, Verification } = require("lib");

Tester.createFile("xlsx");
PageOrientation.setOrientation("Portrait");

FileMenu.downloadAs("xlsx");
Verification.openFile();
Verification.check("xl/worksheets/sheet1.xml", "//worksheet/pageSetup/@orientation", "portrait");

console.log(Verification.isSuccess());
Tester.close();
