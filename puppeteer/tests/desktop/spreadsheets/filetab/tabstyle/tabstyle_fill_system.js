// Checks tabstyle 'Fill' with System theme
const { FileMenu } = require("lib");

const fileName = "xlsx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: "Same as system",
        tabStyle: "Fill",
    },
});

// System theme can be either light (theme-white) or dark (theme-night) depending on system settings
const systemThemeSelector = "body.theme-white, body.theme-night";
const isThemeApplied = Tester.checkSelector(systemThemeSelector);
const isTabStyleApplied = Tester.checkSelector('li[data-value="fill"].selected');
if (!isThemeApplied) {
    throw new Error("System theme was not applied");
}
if (!isTabStyleApplied) {
    throw new Error("Fill tab style was not applied");
}

console.log("System theme + Fill tab style successfully applied and verified");

Tester.close();
