const { TextForm } = require("lib");
Tester.createFile("Document");
Tester.input("Hello");

TextForm.clickJustified();

Tester.close();