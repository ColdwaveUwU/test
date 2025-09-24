// Checks tabstyle 'Line' with Gray theme
const { FileMenu } = require("lib");

const fileName = "pdf";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: { value: "Gray" },
        tabStyle: "Line",
    },
});

const isThemeApplied = Tester.checkSelector("body.theme-gray");
const isTabStyleApplied = Tester.checkSelector('li[data-value="line"].selected');
if (!isThemeApplied) {
    throw new Error("Gray theme was not applied");
}
if (!isTabStyleApplied) {
    throw new Error("Line tab style was not applied");
}

console.log("Gray theme + Line tab style successfully applied and verified");

Tester.close();
