// A smoke test checks the creation, text formatting, adding slides, and saving in all formats of a PPTX file.
// Creating a presentation,
// entering text, applying formatting to the text
// (bold, italic, underline, strikethrough, highlight, text color, font, font size),
// creating a slide, and downloading in all possible formats
// (pptx, pdf, odp, potx, pdfa, otp, ppsx, png, jpg).

const { FileMenu, Font, Color, SlideShowManager } = require("lib");
Tester.createFile("pptx");

Tester.keyPress("Tab");
Tester.keyPress("Enter");

Tester.input("Hello World!");
Tester.keyDown("Shift");
for (let i = 0; i < 12; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.clickBold();
Font.clickFontColor({ type: Color.Type.Auto });

Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");

Tester.input("Hello World!");
Tester.keyDown("Shift");
for (let i = 0; i < 12; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.clickItalic();
Font.clickFontColor({ type: Color.Type.Standard, index: 5 });

// Switching to another placeholder.
Tester.keyPress("Escape");
Tester.keyPress("Tab");

Tester.input("Hello World!");
Tester.keyDown("Shift");
for (let i = 0; i < 12; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.clickUnderline();
Font.clickFontColor({
    type: Color.Type.Custom,
    r: 100,
    g: 100,
    b: 100,
});

Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");

Tester.input("Hello World!");
Tester.keyDown("Shift");
for (let i = 0; i < 12; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.clickStrikeout();

// Add a new slide.
SlideShowManager.addSlide();

Tester.keyPress("Tab");
Tester.keyPress("Enter");

Tester.input("Hello World!");
Tester.keyDown("Shift");
for (let i = 0; i < 12; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.selectFont("Times New Roman");
Font.selectFontSize("36");
Font.clickFontColor({ type: Color.Type.Standard, index: 5 });
Font.clickClearStyle();
Font.clickFontColor({
    type: Color.Type.Custom,
    r: 100,
    g: 100,
    b: 100,
});

Tester.keyPress("ArrowRight");

// Switching to another placeholder.
Tester.keyPress("Escape");
Tester.keyPress("Tab");

Tester.input("Hello World!");
Tester.keyDown("Shift");
for (let i = 0; i < 12; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.clickSubscript();

Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");

Tester.input("Hello World!");
Tester.keyDown("Shift");
for (let i = 0; i < 12; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.clickSuperscript();

Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");

Tester.input("Hello World!");
Tester.keyDown("Shift");
for (let i = 0; i < 12; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.clickIncFont();

Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");

Tester.input("Hello World!");
Tester.keyDown("Shift");
for (let i = 0; i < 12; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.clickDecFont();

Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");

Tester.input("Hello World!");
Tester.keyDown("Shift");
for (let i = 0; i < 12; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.clickHightlight({ index: 3 });
Tester.keyPress("ArrowRight");

FileMenu.downloadAs("pptx");
FileMenu.downloadAs("ppsx");
FileMenu.downloadAs("pdf");
FileMenu.downloadAs("odp");
FileMenu.downloadAs("potx");
FileMenu.downloadAs("otp");
FileMenu.downloadAs("jpg");
FileMenu.downloadAs("png");
Tester.close();
