// https://bugzilla.onlyoffice.com/show_bug.cgi?id=73341
//
// 1 write two paragraphs of text on several lines
// 2 select one paragraph
// 3 add continuous line numbering to it
// 4 download the file
// 5 check for verification
// 6 cancel line numbering
// 7 add a new section
// 8 write the text
// 9 insert line numbering by sections
// 10 download the file
// 11 check for verification

const { TestData, LineNumbers, FileMenu, PageBreakInsert, Verification } = require("lib");
Tester.createFile("docx");
Tester.input(TestData.LOREM_IPSUM());
Tester.keyPress("Enter");
Tester.input(TestData.LOREM_IPSUM());
LineNumbers.selectLineNumberDropdownOption("Continuous");
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "count(//w:lnNumType[@w:countBy='1'])", 1);
Verification.check("word/document.xml", "count(//w:lnNumType[@w:restart='continuous'])", 1);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

Tester.keyDown("ControlLeft");
Tester.keyPress("Z");
Tester.keyUp("ControlLeft");
PageBreakInsert.insertPageBreakWithOptions({
    section: { nextPage: true },
});
Tester.input(TestData.LOREM_IPSUM());


// Set custom line numbering settings with numbering enabled
const customSettings = {
    EnableNumbering: true,
    CustomValues: {
        StartAt: { value: 5, increment: 4, decrement: 3 },
        FormText: { value: 0.4, increment: 4, decrement: 3 },
        Count: { value: 1, increment: 4, decrement: 3 },
    },
    Numbering: {
        RestartPage: false,
        RestartSection: true,
        Continuous: false,
    },
    ApplyTo: "Current",
};
LineNumbers.setCustomLineNumbersSettings(customSettings);
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "count(//w:lnNumType[@w:countBy='2'])", 1);
Verification.check("word/document.xml", "count(//w:lnNumType[@w:distance='720'])", 1);
Verification.check("word/document.xml", "count(//w:lnNumType[@w:restart='newSection'])", 1);
Verification.check("word/document.xml", "count(//w:lnNumType[@w:start='5'])", 1);
isSuccess = Verification.isSuccess();
console.log(isSuccess);
Tester.close();
