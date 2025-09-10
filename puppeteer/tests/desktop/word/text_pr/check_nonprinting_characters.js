const { TextForm } = require("lib");
Tester.createFile("Document");

TextForm.selectNonPrintChar("Nonprinting characters");
TextForm.selectNonPrintChar("Hidden table borders");
TextForm.selectNonPrintChar("All");

Tester.close();
