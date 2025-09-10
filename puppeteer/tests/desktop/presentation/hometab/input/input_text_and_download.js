const { FileMenu, Font } = require("lib");
Tester.createFile("pptx");
Tester.keyPress("Tab");
Font.clickBold();
Tester.keyPress("Enter");
Tester.input("Hello World!");
// Switching to another placeholder.
Tester.keyPress("Escape");
Tester.keyPress("Tab");

Font.clickUnderline();
Tester.keyPress("Enter");
Tester.input("Hello World!");

Font.clickItalic();
Tester.keyPress("Enter");
Tester.input("Hello World!");

FileMenu.downloadAs("ppsx");
FileMenu.downloadAs("pdf");
FileMenu.downloadAs("odp");
FileMenu.downloadAs("potx");
FileMenu.downloadAs("otp");
FileMenu.downloadAs("jpg");
FileMenu.downloadAs("png");
Tester.close();
