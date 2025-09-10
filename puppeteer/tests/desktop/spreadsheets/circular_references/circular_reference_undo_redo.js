const { FileMenu, Verification } = require("lib");
Tester.createFile("xlsx");

FileMenu.setAdvancedSettings({
    calculating: {
        enableIter: true,
    },
});

Tester.input("=A1+1");
Tester.keyPress("ArrowDown");

Tester.keyDown("Control");
Tester.keyPress("Z");
Tester.keyUp("Control");

Tester.keyDown("Control");
Tester.keyPress("Y");
Tester.keyUp("Control");

FileMenu.downloadAs("xlsx");
Verification.openFile();
Verification.check("xl/worksheets/sheet1.xml", "//row[1]/c[1]/v[1]/text()[1]", "100");

console.log(Verification.isSuccess());

Tester.close();
