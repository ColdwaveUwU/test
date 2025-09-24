// Checks tabstyle 'Fill' with Modern Light theme
const { FileMenu } = require("lib");

const fileName = "pptx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: { value: "Modern Light" },
        tabStyle: "Fill",
    },
});

const isThemeApplied = Tester.checkSelector("body.theme-white");
const isTabStyleApplied = Tester.checkSelector('li[data-value="fill"].selected');
if (!isThemeApplied) {
    throw new Error("Modern Light theme was not applied");
}
if (!isTabStyleApplied) {
    throw new Error("Fill tab style was not applied");
}

console.log("Modern Light theme + Fill tab style successfully applied and verified");

Tester.close();
