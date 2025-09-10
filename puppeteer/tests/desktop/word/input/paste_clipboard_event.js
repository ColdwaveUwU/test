const { FileMenu } = require("lib");
Tester.createFile("docx");
Tester.clipboardCopyPasteEvent("text/html", "example");
FileMenu.downloadAs("docx");
Tester.close();
