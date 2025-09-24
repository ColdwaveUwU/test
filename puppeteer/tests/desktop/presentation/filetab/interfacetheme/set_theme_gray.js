// Creates presentation, applies Gray theme via advanced settings and waits for theme-gray CSS class using checkSelector
const { FileMenu } = require("lib");

const fileName = "pptx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: { value: "Gray" },
    },
});

const isGrayThemeApplied = Tester.checkSelector("body.theme-gray");
if (!isGrayThemeApplied) {
    throw new Error("Gray theme was not applied to the interface");
}
console.log("Gray theme successfully applied and verified");

Tester.close();
