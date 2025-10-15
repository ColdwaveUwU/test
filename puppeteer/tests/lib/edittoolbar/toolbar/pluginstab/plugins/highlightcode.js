const { HighlightCodePlugin } = require("lib");
Tester.createFile("docx");
const highlightCodeOption = {
    language: "apache",
    style: "GitHub",
    tab: "2",
    fontName: "Courier New",
    fontSize: 43,
};
HighlightCodePlugin.inputHighlightCode("testtest", highlightCodeOption);
Tester.waitAutosave();
Tester.close();
