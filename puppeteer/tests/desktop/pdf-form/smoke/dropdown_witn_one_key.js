const { Dropdown, Color, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert dropdown into pdf file
Dropdown.insertDropdown();

// set Anyone role
Dropdown.setRole("Anyone");
// set default fields settings
Dropdown.setFields({
    key: "Dropdown1",
    placeholder: "Dropdown-placeholder",
    tag: "Dropdown-tag",
    tip: "Dropdown-tip",
});
// add value option
Dropdown.setValueOptions({ value: "test" });
// add value option with index 1
Dropdown.setValueOptions({ value: "test1", index: 1, defaultValue: true });
// add value option
Dropdown.setValueOptions({ value: "test2" });
// set border & background color
Dropdown.setColor({
    border: { colorIndex: 27, noBorder: false },
    backgroundColor: {
        type: Color.Type.Custom,
        r: 150,
        g: 55,
        b: 100,
        hex: 0,
    },
});
// set required
Dropdown.setRequired(true);
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");
// insert inline dropdown
Dropdown.insertDropdown();
// click lock button
Dropdown.lock();
// unlock settings
Dropdown.lock();
// delete dropdown
Dropdown.delete();
// insert inline dropdown
Dropdown.insertDropdown();

// set Anyone role
Dropdown.setRole("Anyone");
// set default fields settings
Dropdown.setFields({
    key: "Dropdown1",
});
// add fixed size
Dropdown.setValueOptions({ value: "test3" }, (fixedSize = true));

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:body[1]/w:p[1]/w:sdt[1]/w:sdtPr[1]/w:tag[1]/@w:val", "Dropdown-tag");
Verification.check(
    "word/document.xml",
    "//w:body[1]/w:p[1]/w:sdt[1]/w:sdtPr[1]/w:formPr[1]/@w:helpText",
    "Dropdown-tip"
);
Verification.check("word/document.xml", "//w:body[1]/w:p[1]/w:sdt[1]/w:sdtPr[1]/w:formPr[1]/@w:required", "1");
Verification.check("word/document.xml", "//wps:wsp//w:formPr/@w:key", "Dropdown1");
Verification.check(
    "word/document.xml",
    "//wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:sdt[1]/w:sdtPr[1]/w:dropDownList[1]/w:listItem[2]/@w:value",
    "test"
);
Verification.check(
    "word/document.xml",
    "//wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:sdt[1]/w:sdtPr[1]/w:dropDownList[1]/w:listItem[3]/@w:value",
    "test2"
);
Verification.check(
    "word/document.xml",
    "//wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:sdt[1]/w:sdtPr[1]/w:dropDownList[1]/w:listItem[4]/@w:value",
    "test3"
);
Verification.check("word/document.xml", "//w:formPr[1]/w:shd[1]/@w:color", "963764");
Verification.check("word/document.xml", "//w:border[1]/@w:color", "d9adc7");
Verification.check(
    "word/document.xml",
    "//wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:sdt[1]/w:sdtPr[1]/w:formPr[1]/@w:key",
    "Dropdown1"
);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
