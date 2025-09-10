//https://bugzilla.onlyoffice.com/show_bug.cgi?id=58857
const { ToolMenuSearch } = require("lib");

Tester.openFile("pdf/demo.pdf");
ToolMenuSearch.findText("Get", { sensitive: true, words: false });
Tester.keyDown("Enter");

Tester.close();
