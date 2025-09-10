const { Image } = require("lib");
const { ToolMenuChats } = require("lib");
const test = '<img src="x" onerror="alert(\'XSS\')"/>';
Tester.createFile("docx");
ToolMenuChats.sendMessage(test);
Tester.inputToForm(test, "#title-doc-name");
Tester.close();