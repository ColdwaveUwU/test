//https://bugzilla.onlyoffice.com/show_bug.cgi?id=54138

const { TextField, ToolMenuComments } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert inline TextField into pdf file
TextField.insertInlineTextField();

Tester.keyDown("ControlLeft");
Tester.keyPress("A");
Tester.keyUp("ControlLeft");
ToolMenuComments.addComment("123");

// close test
Tester.close();
