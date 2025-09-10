const { PageOrientation, FileMenu, Verification } = require("lib");

Tester.createFile("xlsx");
PageOrientation.setOrientation("Landscape");

FileMenu.downloadAs("xlsx");
Verification.openFile();
Verification.check("xl/worksheets/sheet1.xml", "//worksheet/pageSetup/@orientation", "landscape");

console.log(Verification.isSuccess());
Tester.close();
