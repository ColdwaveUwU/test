const { Margins, FileMenu, Verification, TestData } = require("lib");

Tester.createFile("docx");

const text = TestData.LOREM_IPSUM();
const customMarginSettings = {
    margins: { top: "2", bottom: "2", left: "2", right: "2" },
    gutterPos: { value: "3", pos: "Top" },
    orientation: "Landscape",
};

Tester.input(text);

Margins.setMargin("Narrow");
Margins.setCustomMargin(customMarginSettings);

FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:pgSz[1]/@w:orient", "landscape");
Verification.check("word/document.xml", "//w:pgMar[1]/@w:top", "2880");
Verification.check("word/document.xml", "//w:pgMar[1]/@w:right", "2880");
Verification.check("word/document.xml", "//w:pgMar[1]/@w:bottom", "2880");
Verification.check("word/document.xml", "//w:pgMar[1]/@w:left", "2880");
Verification.check("word/document.xml", "//w:pgMar[1]/@w:gutter", "4320");
Verification.check("word/document.xml", "//w:cols[1]/@w:equalWidth", "1");

console.log("Verification Status:", Verification.isSuccess());
Tester.close();
