const { ParagraphSettings, Verification, FileMenu } = require("lib");
Tester.createFile("docx");

// Enter text
Tester.input("Hello");

// Set the line spacing value to 11 with a "At least"
ParagraphSettings.selectLineSpacing("At least");
ParagraphSettings.setLineSpacing("11");

// Download the resulting file via the top menu
FileMenu.downloadAs("docx");

// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:spacing[1]/@w:line", "15840");
Verification.check("word/document.xml", "//w:spacing[1]/@w:lineRule", "atLeast");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// Finish test
Tester.close();
