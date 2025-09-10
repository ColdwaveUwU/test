//https://bugzilla.onlyoffice.com/show_bug.cgi?id=62241
const { ToolMenuSearch, Draw } = require("lib");
Tester.createFile("docx");
Draw.penOne({ type: 5, x: 50, y: 100, hue: 45 }, 0, 0, 30, 30, "0.5 mm");
ToolMenuSearch.findText("1", { sensitive: false, words: false });
Tester.keyDown("Enter");

Tester.close();
