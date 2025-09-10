// set format of inline text field to digits
const { TextField, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert inline TextField into pdf file
TextField.insertInlineTextField();
// Set format
TextField.setFormat("Digits");
TextField.setFields({
    defaultValue: "12345",
});
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");

//Insert inline TextField into pdf file
TextField.insertInlineTextField();
// Set format
TextField.setFormat("Digits");
TextField.setFields({
    placeholder: "1111",
    defaultValue: "Q1",
});

FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "count(//w:p[*]/w:sdt[1]/w:sdtPr[1]/w:textFormPr[1]/w:format[1]/@w:type)", 2);
Verification.check("word/document.xml", "//w:p[1]/w:sdt[1]/w:sdtContent[1]/w:r[1]/w:t[1]/text()[1]", "12345");
Verification.check("word/document.xml", "//w:p[2]/w:sdt[1]/w:sdtContent[1]/w:r[1]/w:t[1]/text()[1]", "1111");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
