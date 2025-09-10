const { Font, TextForm } = require("lib");
Tester.openFile("docx/new.docx");
Font.selectFontSize("14");
Font.clickFontColor({ type: 0 });
Font.clickFontColor({ type: 2, index: 5 });
Font.clickFontColor({ type: 3, x: 100, y: 100 });
Font.clickFontColor({
    type: 4,
    r: 100,
    g: 100,
    b: 100,
});
Font.clickFontColor({
    type: 5,
    x: 50,
    y: 100,
    hue: 45,
});
Font.clickHightlight({ index: 3 });
TextForm.clickShading({ type: 2, index: 5 });
TextForm.clickShading({ type: 3, x: 100, y: 100 });
TextForm.clickShading({
    type: 4,
    r: 100,
    g: 100,
    b: 100,
});
TextForm.clickShading({
    type: 5,
    x: 50,
    y: 100,
    hue: 45,
});
Tester.close();
