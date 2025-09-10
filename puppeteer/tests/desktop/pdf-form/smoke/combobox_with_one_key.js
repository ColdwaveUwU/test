const { ComboBox, Color, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert ComboBox into pdf file
ComboBox.insertComboBox();

// set Anyone role
ComboBox.setRole("Anyone");
// set default fields settings
ComboBox.setFields({
    key: "Combobox1",
    placeholder: "Combobox-placeholder",
    tag: "Combobox-tag",
    tip: "Combobox-tip",
    defaultValue: "test1",
});
// add value option
ComboBox.setValueOptions({ value: "test" });
// add value option with index 1
ComboBox.setValueOptions({ value: "test1", index: 1 });
// add value option
ComboBox.setValueOptions({ value: "test2" });
// set border & background color
ComboBox.setColor({
    border: { colorIndex: 7, noBorder: false },
    backgroundColor: { type: Color.Type.Standart, index: 4 },
});
// set required
ComboBox.setRequired(true);
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");
// insert inline ComboBox
ComboBox.insertComboBox();
// click lock button
ComboBox.lock();
// unlock settings
ComboBox.lock();
// delete combobox
ComboBox.delete();
// insert inline ComboBox
ComboBox.insertComboBox();

// set Anyone role
ComboBox.setRole("Anyone");
// set default fields settings
ComboBox.setFields({
    key: "Combobox1",
});
// add fixed size
ComboBox.setValueOptions({ value: "test3" }, (fixedSize = true));

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:body[1]/w:p[1]/w:sdt[1]/w:sdtPr[1]/w:tag[1]/@w:val", "Combobox-tag");
Verification.check(
    "word/document.xml",
    "//w:body[1]/w:p[1]/w:sdt[1]/w:sdtPr[1]/w:formPr[1]/@w:helpText",
    "Combobox-tip"
);
Verification.check(
    "word/document.xml",
    "//wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:sdt[1]/w:sdtPr[1]/w:comboBox[1]/w:listItem[1]/@w:value",
    "test1"
);
Verification.check("word/document.xml", "//wps:wsp//w:formPr/@w:key", "Combobox1");
Verification.check(
    "word/document.xml",
    "//wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:sdt[1]/w:sdtPr[1]/w:comboBox[1]/w:listItem[2]/@w:value",
    "test"
);
Verification.check(
    "word/document.xml",
    "//wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:sdt[1]/w:sdtPr[1]/w:comboBox[1]/w:listItem[3]/@w:value",
    "test2"
);
Verification.check("word/document.xml", "//w:formPr[1]/w:shd[1]/@w:color", "5b9bd5");
Verification.check("word/document.xml", "//w:border[1]/@w:color", "a2b2ca");
Verification.check(
    "word/document.xml",
    "//wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:sdt[1]/w:sdtPr[1]/w:formPr[1]/@w:key",
    "Combobox1"
);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
