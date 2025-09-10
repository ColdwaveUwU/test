const { Font } = require("lib");
Tester.createFile("Document");

Font.clickSuperscript();
Tester.input("Hello");

Tester.close();