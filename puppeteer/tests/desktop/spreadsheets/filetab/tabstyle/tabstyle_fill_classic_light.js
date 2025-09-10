// Checks tabstyle 'Fill' with Classic Light theme
const { FileMenu } = require("lib");

const fileName = "xlsx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: "Classic Light",
        tabStyle: "Fill",
    },
});

const isThemeApplied = Tester.checkSelector("body.theme-classic-light");
const isTabStyleApplied = Tester.checkSelector('li[data-value="fill"].selected');
if (!isThemeApplied) {
    throw new Error("Classic Light theme was not applied");
}
if (!isTabStyleApplied) {
    throw new Error("Fill tab style was not applied");
}

console.log("Classic Light theme + Fill tab style successfully applied and verified");

Tester.close();
