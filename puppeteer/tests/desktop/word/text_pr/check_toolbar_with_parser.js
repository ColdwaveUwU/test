const { Font, TextForm, TestData, PageBreakInsert, Hyperlink, FileMenu } = require("lib");

var randomSize = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "22", "24", "26", "28", "36", "48", "72", "96"];
var length = randomSize.length - 1;

var getRandomNumber = function () {
    return Math.floor(Math.random() * length);
};

var selectAll = async function () {
    Tester.keyDown("Control");
    Tester.keyPress("A");
    Tester.keyUp("Control");
};

var selectHome = async function () {
    Tester.keyDown("Shift");
    Tester.keyPress("Home");
    Tester.keyUp("Shift");
};

Tester.createFile("docx");

Tester.input(TestData.LOREM_IPSUM());
selectAll();
Font.selectFontSize(randomSize[getRandomNumber()]);
FileMenu.downloadAs("docx");
//parser

Tester.keyPress("ArrowRight");
Font.clickItalic();
selectHome();
Font.selectFontSize(randomSize[getRandomNumber()]);
FileMenu.downloadAs("docx");
//parser

TextForm.clickAlignCenter();
FileMenu.downloadAs("docx");
//parser

TextForm.clickJustified();
FileMenu.downloadAs("docx");
//parser

TextForm.clickAlignLeft();
FileMenu.downloadAs("docx");
//parser

TextForm.clickAlignRight();
FileMenu.downloadAs("docx");
//parser

selectAll();
TextForm.clickAlignCenter();
FileMenu.downloadAs("docx");
//parser

TextForm.clickJustified();
FileMenu.downloadAs("docx");
//parser

TextForm.clickAlignLeft();
FileMenu.downloadAs("docx");
//parser

TextForm.clickAlignRight();
FileMenu.downloadAs("docx");
//parser

Font.clickSuperscript();
FileMenu.downloadAs("docx");
//parser

Font.clickSubscript();
FileMenu.downloadAs("docx");
//parser

Tester.keyPress("ArrowRight");
selectHome();
Font.clickSuperscript();
FileMenu.downloadAs("docx");
//parser

Font.clickSubscript();
FileMenu.downloadAs("docx");
//parser

selectAll();
Font.clickHightlight({ index: 3 });
FileMenu.downloadAs("docx");
//parser

Tester.keyPress("ArrowRight");
selectHome();
Font.clickHightlight({ index: 5 });
FileMenu.downloadAs("docx");
//parser

Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");
Hyperlink.addExternalLink({ link: "https://www.onlyoffice.com/ru/" });
FileMenu.downloadAs("docx");
//редактировать, перейти, проверить URL, удалить
//parser
//проверка числа страниц, параграфов, слов, символов
PageBreakInsert.insertPageBreak();
PageBreakInsert.insertPageBreak();
PageBreakInsert.insertPageBreak();
FileMenu.downloadAs("docx");

Tester.close();
