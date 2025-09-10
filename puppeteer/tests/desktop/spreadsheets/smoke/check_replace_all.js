//https://bugzilla.onlyoffice.com/show_bug.cgi?id=61803
const { ToolMenuSearch } = require("lib");
Tester.createFile("xlsx");
Tester.input("1");
Tester.keyDown("Enter");
ToolMenuSearch.replaceText({ find: "1", replace: "test", method: "all", sensitive:true, words:true });
Tester.close();
