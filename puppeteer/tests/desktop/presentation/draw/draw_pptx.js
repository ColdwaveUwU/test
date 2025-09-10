//The test checks the Draw option (adding to a slide and removing via eraser) in a PPTX file.

const { FileMenu, TestData, Font, Draw, Color, Verification } = require("lib");
Tester.createFile("pptx");
Tester.input(TestData.ONE_WORD_TEXT());
Tester.keyDown("Shift");
for (let i = 0; i < 14; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.clickBold();

Draw.clickDraw();
Draw.penOne({ type: 5, x: 50, y: 100, hue: 45 }, 0, 20, 50, 30, "0.5 mm");
Draw.penOne({ type: Color.Type.Auto }, 50, 150, 30, 30, "2 mm");
Draw.penOne({ type: Color.Type.CustomClick, x: 30, y: 50, hue: 10 }, 100, 50, 30, 30, "1 mm");
Draw.penOne({ index: 5 }, 0, 0, 100, 230, "3.5 mm");
Draw.eraser(50, 150, 30, 30);
Draw.eraser(100, 50, 30, 30);
Draw.eraser(0, 0, 100, 230);

Tester.keyPress("Escape");

Draw.penTwo({ type: 5, x: 28, y: 14, hue: 28 }, 0, 0, 203, 78, "1 mm");
Draw.penTwo({ index: 5 }, 0, 0, 24, 88);
Draw.eraser(0, 0, 24, 88);

Tester.keyPress("Escape");

Draw.highlighter({ type: 5, x: 45, y: 55, hue: 55 }, 15, 15, 145, 73, "2 mm");
Draw.highlighter({ index: 5 }, 0, 30, 200, 50, "10 mm");
Draw.eraser(0, 30, 200, 50);

Tester.keyPress("Escape");

const formats = ["pdf", "odp", "potx", "otp", "jpg", "png", "pptx"];
for (let i = 0; i < formats.length; i++) {
    FileMenu.downloadAs(formats[i]);
}

Verification.openFile();

const linesToCheck = [
    {
        spnIndex: 3,
        x: "6102127",
        y: "3830265",
        width: "1013297",
        height: "202659",
        thickness: "18000",
    },
    {
        spnIndex: 4,
        x: "6102127",
        y: "3424946",
        width: "4113989",
        height: "1580744",
        thickness: "36000",
    },
    {
        spnIndex: 5,
        x: "6406117",
        y: "3728936",
        width: "2634574",
        height: "1175425",
        thickness: "72000",
    },
];

await Promise.all(
    linesToCheck.map(async (line) => {
        const basePath = `//p:sp[${line.spnIndex}]/p:spPr[1]`;
        await Verification.check("ppt/slides/slide1.xml", `${basePath}/a:xfrm[1]/a:off[1]/@x`, line.x);
        await Verification.check("ppt/slides/slide1.xml", `${basePath}/a:xfrm[1]/a:off[1]/@y`, line.y);

        await Verification.check("ppt/slides/slide1.xml", `${basePath}/a:xfrm[1]/a:ext[1]/@cx`, line.width);
        await Verification.check("ppt/slides/slide1.xml", `${basePath}/a:xfrm[1]/a:ext[1]/@cy`, line.height);

        await Verification.check("ppt/slides/slide1.xml", `${basePath}/a:ln[1]/@w`, line.thickness);
    })
);
console.log(Verification.isSuccess());

Tester.close();
