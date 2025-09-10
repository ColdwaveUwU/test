const { ParagraphSettings, Verification, FileMenu } = require("lib");
Tester.createFile("docx");

// Enter text
Tester.input("Hello");

// Set the line spacing value to 4.82 with a "Exactly"
ParagraphSettings.selectLineSpacing("Exactly");
ParagraphSettings.setLineSpacing("4.82");

// Download the resulting file via the top menu
FileMenu.downloadAs("docx");

// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:spacing[1]/@w:line", "6940");
Verification.check("word/document.xml", "//w:spacing[1]/@w:lineRule", "exact");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// Finish test
Tester.close();
