// Checks tabstyle 'Fill' with Dark theme
const { FileMenu } = require("lib");

const fileName = "pptx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: { value: "Dark" },
        tabStyle: "Fill",
    },
});

const isThemeApplied = Tester.checkSelector("body.theme-dark");
const isTabStyleApplied = Tester.checkSelector('li[data-value="fill"].selected');
if (!isThemeApplied) {
    throw new Error("Dark theme was not applied");
}
if (!isTabStyleApplied) {
    throw new Error("Fill tab style was not applied");
}

console.log("Dark theme + Fill tab style successfully applied and verified");

Tester.close();
