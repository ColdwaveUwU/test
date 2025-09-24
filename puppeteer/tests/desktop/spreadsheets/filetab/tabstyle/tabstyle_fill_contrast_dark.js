// Checks tabstyle 'Fill' with Contrast Dark theme
const { FileMenu } = require("lib");

const fileName = "xlsx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: { value: "Contrast Dark" },
        tabStyle: "Fill",
    },
});

const isThemeApplied = Tester.checkSelector("body.theme-contrast-dark");
const isTabStyleApplied = Tester.checkSelector('li[data-value="fill"].selected');
if (!isThemeApplied) {
    throw new Error("Contrast Dark theme was not applied");
}
if (!isTabStyleApplied) {
    throw new Error("Fill tab style was not applied");
}

console.log("Contrast Dark theme + Fill tab style successfully applied and verified");

Tester.close();
