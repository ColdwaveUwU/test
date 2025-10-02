// This test verifies creating a new presentation with sample content
const { FileMenu, Verification } = require("lib");

const fileName = "pptx";

Tester.createFile(fileName);

FileMenu.createNew("SAMPLE");

FileMenu.downloadAs("pptx");

Verification.openFile();
const filePath1 = "ppt/slides/slide7.xml";

const onlyofficeXpath = "//p:sp[5]/p:txBody[1]/a:p[1]/a:r[1]/a:t[1]";
Verification.check(filePath1, onlyofficeXpath, "Thank you!");

if (!Verification.isSuccess()) {
    throw new Error("Sample content template missing 'Thank you!' text - blank presentation created instead");
}

const filePath2 = "ppt/slides/slide4.xml";
const peaceXpath = "//a:p[3]/a:r[1]/a:t[1]/text()[1]";
Verification.check(filePath2, peaceXpath, "Business professionals:");

if (!Verification.isSuccess()) {
    throw new Error("Sample content template missing 'Business professionals:' text");
}

console.log(
    "Presentation with sample content created and verified successfully - contains 'Thank you!' and 'Business professionals:' template content"
);

Tester.close();
