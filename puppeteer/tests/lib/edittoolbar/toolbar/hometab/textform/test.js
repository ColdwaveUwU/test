// Include the Toolbar library
const { TextForm, Color } = require("lib");
// Open the file new.docx
Tester.createFile("docx");
// add text
Tester.input("Example");
Tester.keyDown("Shift");
for (let i = 0; i < 7; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
// using textfrom
TextForm.clickDecIndent();
TextForm.clickIncIndent();
TextForm.clickLineSpacing("2.0", { line: "Exactly" });
TextForm.clickBullets("Arrow bullets");
TextForm.clickNumbering("aDot");
TextForm.clickMultilevels("symbols");
TextForm.clickAlignLeft();
TextForm.clickAlignCenter();
TextForm.clickAlignRight();
TextForm.clickJustified();
TextForm.selectNonPrintChar("Nonprinting characters");
TextForm.clickShading({
    type: Color.Type.CustomClick,
    x: 50,
    y: 100,
    hue: 45,
});

TextForm.addNewStyle("New style from selection", "Normal");
TextForm.setStyle("Heading 1");
TextForm.setStyle("New style from selection");
TextForm.setBorderColor({
    type: Color.Type.Standard,
    index: 5,
});
TextForm.setBorders("Bottom borders");

TextForm.setBorderStyle("2.25  pt");

TextForm.setTextDirection("Right-to-left");
TextForm.setTextDirection("Left-to-right");

TextForm.setBulletsListSettings({
    type: "Symbol: §",
    alignment: "Center",
    size: "10",
    bold: true,
    italic: true,
    color: {
        type: Color.Type.Standard,
        index: 5,
    },
});

TextForm.setNumberingListSettings({
    numberFormat: "ABC",
    type: "A, B, C,...",
    alignment: "Center",
    font: "Arial",
    size: "12",
    bold: true,
    italic: true,
    color: {
        type: Color.Type.Standard,
        index: 5,
    },
});

TextForm.setMultiLevelListSettings({
    listLevel: "2",
    numberFormat: "ABC",
    type: "A, B, C,...",
    includeLevelNumber: "Level 1",
    startAt: "2",
    restartList: false,
    size: "12",
    bold: true,
    italic: true,
    color: {
        type: Color.Type.Standard,
        index: 5,
    },
    font: "Arial",
    alignment: "Center",
    alignmentAt: "8",
    textIndent: "8",
    followNumberWith: "Tab character",
    tabStopAt: "8",
});

// test change list level
TextForm.clickMultilevels("numbered");
TextForm.changeMultilevelListLevel("Level 9");

TextForm.clickNumbering("A");
TextForm.changeNumberingListLevel("Level 2");

TextForm.clickBullets("Arrow bullets");
TextForm.changeBulletsListLevel("Level 5");

// test close
Tester.close();
