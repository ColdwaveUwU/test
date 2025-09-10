const { TextForm } = require("lib");
Tester.createFile("Document");

TextForm.clickIncIndent();
Tester.input("Hello");
TextForm.clickDecIndent();

Tester.close();