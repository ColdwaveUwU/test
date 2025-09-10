const { Draw } = require("lib");
Tester.openFile("docx/new2.docx");
Draw.penOne({ type: 5, x: 50, y: 100, hue: 45 }, 0, 0, 30, 30, "0.5 mm");
Draw.penOne({ index: 5 }, 0, 0, 100, 230, "3.5 mm");
Draw.penTwo({ type: 5, x: 28, y: 14, hue: 28 }, 0, 0, 203, 78, "1 mm");
Draw.penTwo({ index: 5 }, 0, 0, 24, 88);
Draw.highlighter({ type: 5, x: 45, y: 55, hue: 55 }, 15, 15, 145, 73, "2 mm");
Draw.highlighter({ index: 5 }, 15, 15, 145, 73, "10 mm");

Tester.close();
