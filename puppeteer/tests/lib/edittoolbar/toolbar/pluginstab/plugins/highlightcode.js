const { HighlightCodePlugin } = require("lib");
Tester.createFile("docx");
const hightLightCodeOption = {
    language: "apache",
    style: "GitHub",
    tab: "2",
    fontName: "Courier New",
    fontSize: 43,
};
HighlightCodePlugin.inputHightLightCode("testtest", hightLightCodeOption);
Tester.waitAutosave();
Tester.close();
