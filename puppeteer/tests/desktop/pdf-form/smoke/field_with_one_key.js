// 1) Add a fixed-id field
// fill in its settings
// 2) Add an inline field and a fixed-id
// 3) Undo-redo
// 4)Set one key for the fields and fill in the default value

const { TextField, Color, FileMenu, Font, TextForm, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert fixed TextField into pdf file
TextField.insertFixedTextField();

// Set Anymore role
TextField.setRole("Anyone");
// Set default fields settings
TextField.setFields({
    key: "TextField-key",
    placeholder: "TextField1",
    tag: "TextField-tag",
    tip: "TextField-tip",
    defaultValue: "123456789",
});

// Set format
TextField.setFormat("Digits");

// Set auto fit
TextField.setAutoFit(true);
// Set multiline
TextField.setMultiline(true);
// Set char limit
TextField.setCharLimit(true);
// Set combo chars
TextField.setComboChars(true);
// decrement char limit
TextField.setCharLimitValue({ value: 9 });

// Set color & background color
TextField.setColor({
    border: { colorIndex: 3, noBorder: true },
    backgroundColor: { type: Color.Type.Standart, index: 3 },
});
// Set required
TextField.setRequired(true);
FileMenu.downloadAs("pdf");

Tester.keyPress("Delete");

//Insert inline TextField into pdf file
TextField.insertInlineTextField();
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");
TextField.insertFixedTextField();
// Set fixed size
TextField.setFixedSize(true);
Tester.keyDown("Control");
for (let i = 0; i < 2; i++) {
    Tester.keyPress("Z");
}
Tester.keyUp("Control");

Tester.keyDown("Control");
for (let i = 0; i < 2; i++) {
    Tester.keyPress("Y");
}
Tester.keyUp("Control");

TextField.setFields({
    key: "Text2",
    placeholder: "TextField-placeholder",
    tag: "TextField-tag2",
    tip: "TextField-tip2",
    defaultValue: "TextField-default2",
});

Font.selectFont("Verdana");
Font.selectFontSize("14");
Font.clickFontColor({ type: Color.Type.Standard, index: 1 });

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check(
    "word/document.xml",
    "//wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:pPr[1]/w:rPr[1]/w:rFonts[1]/@w:cs",
    "Verdana"
);
Verification.check(
    "word/document.xml",
    "//wps:txbx[1]/w:txbxContent[*]/w:p[1]/w:pPr[1]/w:rPr[*]/w:color[@*]/@w:val",
    "ff0000"
);
Verification.check(
    "word/document.xml",
    "//wps:txbx[1]/w:txbxContent[*]/w:p[*]/w:pPr[*]/w:rPr[*]/w:sz[@*]/@w:val",
    "28"
);
Verification.check(
    "word/document.xml",
    "//wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:sdt[1]/w:sdtContent[1]/w:r[1]",
    "TextField-default2"
);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
