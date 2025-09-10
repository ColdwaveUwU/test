// Checks tabstyle 'Line' with Light theme
const { FileMenu } = require("lib");

const fileName = "pptx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: "Light",
        tabStyle: "Line",
    },
});

const isThemeApplied = Tester.checkSelector("body.theme-light");
const isTabStyleApplied = Tester.checkSelector('li[data-value="line"].selected');
if (!isThemeApplied) {
    throw new Error("Light theme was not applied");
}
if (!isTabStyleApplied) {
    throw new Error("Line tab style was not applied");
}

console.log("Light theme + Line tab style successfully applied and verified");

Tester.close();
