const { FileMenu, Verification } = require("lib");
Tester.createFile("xlsx");

FileMenu.setAdvancedSettings({
    calculating: {
        enableIter: true,
    },
});
const isHideHints = true;
Tester.input("1");
Tester.keyPress("Enter");
Tester.input("=A1+A2", isHideHints);
Tester.keyPress("Enter");
Tester.keyPress("F9");

FileMenu.downloadAs("xlsx");
Verification.openFile();
Verification.check("xl/worksheets/sheet1.xml", "//row[2]/c[1]/v[1]/text()[1]", "200");

console.log(Verification.isSuccess());

Tester.close();
