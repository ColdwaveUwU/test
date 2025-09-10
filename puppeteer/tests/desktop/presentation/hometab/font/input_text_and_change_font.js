// Test to verify font color option in placeholder for presentation
const { Font, Color } = require("lib");
Tester.createFile("pptx");

Tester.keyPress("Tab");
Tester.keyPress("Enter");

Tester.input("Hello World!");
Tester.keyDown("Shift");
for (let i = 0; i < 12; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.clickFontColor({ type: Color.Type.Auto });

Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");

Tester.input("Hello World!");
Tester.keyDown("Shift");
for (let i = 0; i < 12; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
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
Font.clickFontColor({
    type: Color.Type.Custom,
    r: 100,
    g: 100,
    b: 100,
});

Tester.close();
