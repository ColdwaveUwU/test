const { Font } = require("lib");
Tester.createFile("Document");

Font.clickSubscript();
Tester.input("Hello");

Tester.close();