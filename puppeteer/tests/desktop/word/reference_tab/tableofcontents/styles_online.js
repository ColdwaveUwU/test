// test checking style Online in Table of Contents in a DOCX file
const { TableOfContents, FileMenu, Verification } = require("lib");
// Create a new DOCX file for testing
Tester.createFile("docx");

// Add text for Level 1 heading
TableOfContents.addText("Level 1");
// Input test data for Level 1
Tester.input("Test 1\n");
// Add text for Level 2 heading
TableOfContents.addText("Level 2");
// Input test data for Level 2
Tester.input("Test 2\n");
// Add text for Level 3 heading
TableOfContents.addText("Level 3");
// Input test data for Level 3
Tester.input("Test 3\n");
// Click the Table of Contents button
TableOfContents.clickTableOfContents();
// Set the Table of Contents settings
TableOfContents.setTableOfContentsSettings({
    styles: "Online",
});
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check(
    "word/styles.xml",
    "//w:styles/w:style[@w:type='paragraph' and w:name/@w:val='toc 1']/w:pPr/w:spacing/@w:after",
    "100"
);
Verification.check(
    "word/styles.xml",
    "count(//w:styles/w:style[@w:type='paragraph' and w:name/@w:val='toc 1']/w:pPr/w:ind/@w:right)",
    0
);
Verification.check(
    "word/styles.xml",
    "count(//w:styles/w:style[@w:type='paragraph' and w:name/@w:val='toc 1']/w:pPr/w:ind/@w:firstLine)",
    0
);
Verification.check(
    "word/styles.xml",
    "count(//w:styles/w:style[@w:type='paragraph' and w:name/@w:val='toc 1']/w:pPr/w:ind/@w:left)",
    0
);
Verification.check(
    "word/styles.xml",
    "//w:styles/w:style[@w:type='paragraph' and w:name/@w:val='toc 1']/w:rPr/w:color/@w:val",
    "00c8c3"
);
Verification.check(
    "word/styles.xml",
    "//w:styles/w:style[@w:type='paragraph' and w:name/@w:val='toc 1']/w:rPr/w:color/@w:themeColor",
    "hyperlink"
);

Verification.check("word/styles.xml", "//w:styles/w:style[@w:styleId='190']/w:pPr/w:spacing/@w:after", "100");
Verification.check("word/styles.xml", "count(//w:styles/w:style[@w:styleId='190']/w:pPr/w:ind/@w:right)", 0);
Verification.check("word/styles.xml", "count(//w:styles/w:style[@w:styleId='190']/w:pPr/w:ind/@w:firstLine)", 0);
Verification.check("word/styles.xml", "//w:styles/w:style[@w:styleId='190']/w:pPr/w:ind/@w:left", "220");
Verification.check("word/styles.xml", "//w:styles/w:style[@w:styleId='190']/w:rPr/w:color/@w:val", "00c8c3");
Verification.check("word/styles.xml", "//w:styles/w:style[@w:styleId='190']/w:rPr/w:color/@w:themeColor", "hyperlink");

Verification.check("word/styles.xml", "//w:styles/w:style[@w:styleId='191']/w:pPr/w:spacing/@w:after", "100");
Verification.check("word/styles.xml", "//w:styles/w:style[@w:styleId='191']/w:pPr/w:ind/@w:left", "440");
Verification.check("word/styles.xml", "//w:styles/w:style[@w:styleId='191']/w:rPr/w:color/@w:val", "00c8c3");
Verification.check("word/styles.xml", "//w:styles/w:style[@w:styleId='191']/w:rPr/w:color/@w:themeColor", "hyperlink");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// Close the test file
Tester.close();
