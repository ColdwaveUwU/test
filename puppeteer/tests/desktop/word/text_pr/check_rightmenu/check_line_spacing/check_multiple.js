const { ParagraphSettings, Verification, FileMenu } = require("lib");
Tester.createFile("docx");

// Enter text #1
Tester.input("Hello");

// Set the line spacing value to 10 with a multiplier
ParagraphSettings.selectLineSpacing("Multiple");
ParagraphSettings.setLineSpacing("10");

// Download the resulting file via the top menu
FileMenu.downloadAs("docx");

// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:spacing[1]/@w:line", "2400");
Verification.check("word/document.xml", "//w:spacing[1]/@w:lineRule", "auto");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// Finish test
Tester.close();
