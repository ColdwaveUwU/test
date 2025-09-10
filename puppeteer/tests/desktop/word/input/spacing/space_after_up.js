// Check setting space after by click on up arrow

// Include the IndentsLayout library
const { FileMenu, Verification, IndentsLayout } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Set space after
IndentsLayout.setSpaceAfter({ upArrow: true, arrowClickCount: 5 });

// Verification
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:spacing[1]/@w:after", "158");

console.log(Verification.isSuccess());

// Close the test example
Tester.close();