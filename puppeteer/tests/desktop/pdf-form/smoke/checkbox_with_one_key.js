const { Checkbox, Color, Font, FileMenu, Verification } = require("lib");

Tester.createFile("pdf");
// insert inline checkbox
Checkbox.insertCheckbox();
// set Anyone role
Checkbox.setRole("Anyone");
// set fields
Checkbox.setFields({
    key: "Checkbox-key",
    tag: "Checkbox-tag",
    tip: "Checkbox-tip",
});
// set color & background color
Checkbox.setColor({
    border: { colorIndex: 7, noBorder: false },
    backgroundColor: { type: Color.Type.Standart, index: 6 },
});
// set required
Checkbox.setRequired(true);
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");

// insert inline checkbox
Checkbox.insertCheckbox();
// set default checkbox
Checkbox.setDefaultCheckbox(true);
Checkbox.setFixedSize(true);
// click lock button
Checkbox.lock();
// unlock settings
Checkbox.lock();
// delete checkbox
Checkbox.delete();
Tester.keyDown("Control");
Tester.keyPress("Z");
Tester.keyUp("Control");

Tester.keyDown("Control");
Tester.keyPress("Y");
Tester.keyUp("Control");

// insert inline checkbox
Checkbox.insertCheckbox();
// set fields
Checkbox.setFields({
    key: "Checkbox-key",
});
Checkbox.setFixedSize(true);
// set fixed size
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");

// insert text
Font.clickBold();
Font.clickItalic();
Tester.input("Hello World!");
Tester.keyPress("Enter");
Font.clickUnderline();
Tester.input("Hello World!");
Tester.keyDown("Shift");
for (let i = 0; i < 20; i++) Tester.keyPress("ArrowLeft");
Tester.keyUp("Shift");
// insert inline checkbox
Checkbox.insertCheckbox();

FileMenu.downloadAs("pdf");
// todo (wait pdf verification)
// Getting verification results
// Verification.openFile();
// Verification.check("word/document.xml", "//w:p[1]/w:sdt[1]/w:sdtPr[1]/w:tag[1]/@w:val", "Checkbox-tag");
// Verification.check("word/document.xml", "//w:p[1]/w:sdt[1]/w:sdtPr[1]/w:formPr[1]/@w:helpText", "Checkbox-tip");
// Verification.check("word/document.xml", "//w:p[1]/w:sdt[1]/w:sdtPr[1]/w:formPr[1]/@w:key", "Checkbox-key");
// Verification.check("word/document.xml", "//w:border[1]/@w:color", "a2b2ca");
// Verification.check("word/document.xml", "//w:shd[1]/@w:color", "a5a5a5");
// Verification.check("word/document.xml", "//w:p[2]/w:sdt[1]/w:sdtPr[1]/w:formPr[1]/@w:key", "Checkbox-key");
// Verification.check("word/document.xml", "count(//w:p[*]/w:sdt[1]/w:sdtContent[1]/w:r[1]/w:rPr[1]/w:b[1])", 2);
// Verification.check("word/document.xml", "count(//w:p[*]/w:sdt[1]/w:sdtContent[1]/w:r[1]/w:rPr[1]/w:i[1])", 2);
// Verification.check("word/document.xml", "//w:pPr[1]/w:rPr[1]/w:u[1]/@w:val", "single");
// let isSuccess = Verification.isSuccess();
// console.log(isSuccess);
// close test
Tester.close();
