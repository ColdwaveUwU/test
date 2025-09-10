// Include the Toolbar library
const { Font } = require("lib");
// Include the Color library
const { Color } = require("lib");
// Open the file new.docx
Tester.createFile("docx");
// Select font size 14

Font.selectFontSize("14");
// Text input with 14 font sizes
Tester.input("Example");
// Set automatic text color
Font.clickFontColor({ type: Color.Type.Auto });
Tester.input("Example1");
// Set Standard text color with index 5 (green)
Font.clickFontColor({ type: Color.Type.Standard, index: 5 });
Tester.input("Example2");
// Set EyeDropper text color and click inside editor
Font.clickFontColor({ type: Color.Type.EyeDropper, x: 100, y: 100 });
Tester.input("Example3");
// Set Custom text color
Font.clickFontColor({
    type: Color.Type.Custom,
    r: 100,
    g: 100,
    b: 100,
});
Tester.input("Example4");
// Set a custom text color using a square and rectangle
Font.clickFontColor({
    type: Color.Type.CustomClick,
    x: 50,
    y: 100,
    hue: 45,
});
Tester.input("Example5");

// Change case tests
const inputText = "caseTest";
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

Font.clickChangeCase("Capitalize Each Word");
Font.clickChangeCase("Sentence case.");
Font.clickChangeCase("lowercase");
Font.clickChangeCase("UPPERCASE");
Font.clickChangeCase("tOGGLE cASE");

// Close the test example
Tester.close();
