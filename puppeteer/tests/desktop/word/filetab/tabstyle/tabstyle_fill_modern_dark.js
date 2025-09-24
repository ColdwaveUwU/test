// Checks tabstyle 'Fill' with Modern Dark theme
const { FileMenu } = require("lib");

const fileName = "docx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: { value: "Modern Dark" },
        tabStyle: "Fill",
    },
});

const isThemeApplied = Tester.checkSelector("body.theme-night");
const isTabStyleApplied = Tester.checkSelector('li[data-value="fill"].selected');
if (!isThemeApplied) {
    throw new Error("Modern Dark theme was not applied");
}
if (!isTabStyleApplied) {
    throw new Error("Fill tab style was not applied");
}

console.log("Modern Dark theme + Fill tab style successfully applied and verified");

Tester.close();
