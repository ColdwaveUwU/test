const {
    Chart,
    Shape,
    FileMenu,
    TestData,
    Font,
    TextForm,
    Verification,
    Color,
    YoutubePlugin,
    DropCap,
} = require("lib");
Tester.createFile("docx");

// Retrieve the list of charts and log the output
Chart.createChart({ groupName: "Pie", chartName: 1 });
Chart.closeEditor();
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "count(//c:chart[1])", 1);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

//delete all
Tester.keyPress("ArrowUp");
Tester.keyDown("ControlLeft");
Tester.keyPress("Home");
Tester.keyUp("ControlLeft");
Tester.keyDown("ControlLeft");
Tester.keyPress("A");
Tester.keyUp("ControlLeft"); //Select all
Tester.keyPress("Delete");

// insert shape
Shape.openShapeList();

Shape.clickRecentlyShape(2);
// rendering the selected shape in the editor
Shape.drawShape();
FileMenu.downloadAs("docx");

// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "count(//mc:Fallback[1]/w:pict/v:shape[@*])", 1);
isSuccess = Verification.isSuccess();
console.log(isSuccess);

//delete all
Tester.keyDown("ControlLeft");
Tester.keyPress("Home");
Tester.keyUp("ControlLeft");
Tester.keyDown("ControlLeft");
Tester.keyPress("A");
Tester.keyUp("ControlLeft"); //Select all
Tester.keyPress("Delete");

Shape.openShapeList();
Shape.clickBasicShape(1);
Shape.drawShape();
Tester.input(TestData.ONE_WORD_TEXT());
FileMenu.downloadAs("docx");
// OoxmlParser
Verification.openFile();
Verification.check("word/document.xml", "//wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:r[1]/w:t[1]", "SimpleTestText");
isSuccess = Verification.isSuccess();
console.log(isSuccess);

Tester.keyDown("ControlLeft");
Tester.keyPress("Home");
Tester.keyUp("ControlLeft");
Tester.keyDown("ControlLeft");
Tester.keyPress("A");
Tester.keyUp("ControlLeft"); //Select all
Tester.keyPress("Delete");

Tester.input(TestData.LOREM_IPSUM());
// Set drop cap position to "In text"
DropCap.setDropCap("In text");
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:p[.//w:pPr/w:framePr[@w:dropCap='drop']]//w:t/text()", "L");
// Verification.check("word/document.xml", "//w:p[.//w:pPr/w:framePr[@w:dropCap='drop']]//w:t/text()", "M");
// Verification.check("word/document.xml", "//w:p[.//w:pPr/w:framePr[@w:dropCap='p']]//w:t/text()", "L");
isSuccess = Verification.isSuccess();
console.log(isSuccess);

//change all indents via the ruler (no method) and compare with the values ​​in the right panel

Tester.keyDown("ControlLeft");
Tester.keyPress("A");
Tester.keyUp("ControlLeft"); //Select all
//set background color for text
TextForm.clickShading({ type: Color.Type.Standard, index: 8 });
Font.clickClearStyle();
FileMenu.downloadAs("docx");

// OoxmlParser
Verification.openFile();
Verification.check("word/document.xml", "count(//w:p[1]/w:pPr/w:shd[@w:val='nil'])", 1);
isSuccess = Verification.isSuccess();
console.log(isSuccess);
// set paragraph style - no method, then clear it
//Font.clickClearStyle();
//FileMenu.downloadAs("docx");
// OoxmlParser

Tester.keyDown("ControlLeft");
Tester.keyPress("End");
Tester.keyUp("ControlLeft");
Tester.keyPress("Enter");
Tester.input(TestData.getParagraphAutoIndex());
Tester.keyPress("Enter");
Tester.input(TestData.getParagraphAutoIndex());
Tester.keyDown("Shift");
for (let i = 0; i < 10; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.selectFontSize("14");

Tester.keyDown("ControlLeft");
Tester.keyDown("AltLeft");
Tester.keyPress("C");
Tester.keyUp("AltLeft");
Tester.keyUp("ControlLeft");

//copy its style via a button on the toolbar

Font.clickClearStyle();

Tester.keyDown("ControlLeft");
Tester.keyPress("A");
Tester.keyUp("ControlLeft");

Tester.keyDown("ControlLeft");
Tester.keyDown("AltLeft");
Tester.keyPress("V");
Tester.keyUp("AltLeft");
Tester.keyUp("ControlLeft");

FileMenu.downloadAs("docx");
Verification.openFile();
Verification.check(
    "word/document.xml",
    "(//w:p[*]/w:r[*]/w:rPr[*]/w:sz[@*])|(//w:p[*]/w:r[*]/w:rPr[*]/w:szCs[@*]/@w:val)",
    "28"
);
isSuccess = Verification.isSuccess();
console.log(isSuccess);

YoutubePlugin.addVideo("https://www.youtube.com/watch?v=0XtCoeTWIO8");
Tester.waitAutosave();
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "count(//o:OLEObject[@*])", 1);
isSuccess = Verification.isSuccess();
console.log(isSuccess);

Tester.close();
