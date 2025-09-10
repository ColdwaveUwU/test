// Checks tabstyle 'Line' with Contrast Dark theme
const { FileMenu } = require("lib");

const fileName = "xlsx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: "Contrast Dark",
        tabStyle: "Line",
    },
});

const isThemeApplied = Tester.checkSelector("body.theme-contrast-dark");
const isTabStyleApplied = Tester.checkSelector('li[data-value="line"].selected');
if (!isThemeApplied) {
    throw new Error("Contrast Dark theme was not applied");
}
if (!isTabStyleApplied) {
    throw new Error("Line tab style was not applied");
}

console.log("Contrast Dark theme + Line tab style successfully applied and verified");

Tester.close();
