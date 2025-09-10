//https://bugzilla.onlyoffice.com/show_bug.cgi?id=74730
//https://bugzilla.onlyoffice.com/show_bug.cgi?id=57807

const { ReviewChanges, ToolMenuSearch, FileMenu } = require("lib");
Tester.openFile("docx/change-test.docx");
// running bug scenario 74730
ReviewChanges.accept("Accept current change");
Tester.keyDown("ControlLeft");
Tester.keyPress("Z");
Tester.keyUp("ControlLeft");
// running bug scenario 57807
Tester.keyDown("ControlLeft");
Tester.keyPress("H");
Tester.keyUp("ControlLeft");
ToolMenuSearch.replaceText({ find: "20", replace: "!", method: "all", sensitive: false, words: false });
FileMenu.downloadAs("docx");
Tester.close();
