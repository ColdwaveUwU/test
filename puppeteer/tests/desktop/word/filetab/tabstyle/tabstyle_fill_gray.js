// Checks tabstyle 'Fill' with Gray theme
const { FileMenu } = require("lib");

const fileName = "docx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: "Gray",
        tabStyle: "Fill",
    },
});

const isThemeApplied = Tester.checkSelector("body.theme-gray");
const isTabStyleApplied = Tester.checkSelector('li[data-value="fill"].selected');
if (!isThemeApplied) {
    throw new Error("Gray theme was not applied");
}
if (!isTabStyleApplied) {
    throw new Error("Fill tab style was not applied");
}

console.log("Gray theme + Fill tab style successfully applied and verified");

Tester.close();
