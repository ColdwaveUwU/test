// This test verifies creating a new presentation with sample content
const { FileMenu, Verification } = require("lib");

const fileName = "pptx";

Tester.createFile(fileName);

FileMenu.createNew("SAMPLE");

FileMenu.downloadAs("pptx");

Verification.openFile();
const filePath = "ppt/slides/slide8.xml";

const onlyofficeXpath = "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[1]/text()[1]";
Verification.check(filePath, onlyofficeXpath, "ONLYOFFICE ");

if (!Verification.isSuccess()) {
    throw new Error("Sample content template missing 'ONLYOFFICE ' text - blank presentation created instead");
}

const peaceXpath = "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[2]/a:t[1]/text()[1]";
Verification.check(filePath, peaceXpath, "stands for Peace");

if (!Verification.isSuccess()) {
    throw new Error("Sample content template missing 'stands for Peace' text");
}

console.log(
    "Presentation with sample content created and verified successfully - contains 'ONLYOFFICE ' and 'stands for Peace' template content"
);

Tester.close();
