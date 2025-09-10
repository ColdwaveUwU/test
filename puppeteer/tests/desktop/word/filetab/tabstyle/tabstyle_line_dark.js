// Checks tabstyle 'Line' with Dark theme
const { FileMenu } = require("lib");

const fileName = "docx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: "Dark",
        tabStyle: "Line",
    },
});

const isThemeApplied = Tester.checkSelector("body.theme-dark");
const isTabStyleApplied = Tester.checkSelector('li[data-value="line"].selected');
if (!isThemeApplied) {
    throw new Error("Dark theme was not applied");
}
if (!isTabStyleApplied) {
    throw new Error("Line tab style was not applied");
}

console.log("Dark theme + Line tab style successfully applied and verified");

Tester.close();
