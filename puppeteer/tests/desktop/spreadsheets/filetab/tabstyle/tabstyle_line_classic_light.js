// Checks tabstyle 'Line' with Classic Light theme
const { FileMenu } = require("lib");

const fileName = "xlsx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: "Classic Light",
        tabStyle: "Line",
    },
});

const isThemeApplied = Tester.checkSelector("body.theme-classic-light");
const isTabStyleApplied = Tester.checkSelector('li[data-value="line"].selected');
if (!isThemeApplied) {
    throw new Error("Classic Light theme was not applied");
}
if (!isTabStyleApplied) {
    throw new Error("Line tab style was not applied");
}

console.log("Classic Light theme + Line tab style successfully applied and verified");

Tester.close();
