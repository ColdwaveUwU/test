// Checks tabstyle 'Line' with Modern Light theme
const { FileMenu } = require("lib");

const fileName = "pptx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: "Modern Light",
        tabStyle: "Line",
    },
});

const isThemeApplied = Tester.checkSelector("body.theme-white");
const isTabStyleApplied = Tester.checkSelector('li[data-value="line"].selected');
if (!isThemeApplied) {
    throw new Error("Modern Light theme was not applied");
}
if (!isTabStyleApplied) {
    throw new Error("Line tab style was not applied");
}

console.log("Modern Light theme + Line tab style successfully applied and verified");

Tester.close();
