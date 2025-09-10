const { TextField, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert inline TextField into pdf file
TextField.insertInlineTextField();
// Set format
TextField.setFormat("None");
TextField.setFields({
    defaultValue: "TextField-default",
});
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");

//Insert inline TextField into pdf file
TextField.insertInlineTextField();
// Set format
TextField.setFormat("Digits");
TextField.setFields({
    defaultValue: "123",
});
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");

//Insert inline TextField into pdf file
TextField.insertInlineTextField();
// Set format
TextField.setFormat("Digits");
TextField.setFields({
    placeholder: "12345",
    defaultValue: "Q123",
});
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");

//Insert inline TextField into pdf file
TextField.insertInlineTextField();
// Set format
TextField.setFormat("Letters");
TextField.setFields({
    defaultValue: "TextFieldDefault",
});
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");

//Insert inline TextField into pdf file
TextField.insertInlineTextField();
// Set format
TextField.setFormat("Letters");
TextField.setFields({
    placeholder: "Letters",
    defaultValue: "TextField-Default",
});
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");

//Insert inline TextField into pdf file
TextField.insertInlineTextField();
// Set format
TextField.setFormat("Arbitrary Mask");
// Set arbitrary mask
TextField.setMask("Credit card number (e.g 4111-1111-1111-1111)");
TextField.setFields({
    defaultValue: "1234-5678-9999",
});
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");
//Insert inline TextField into pdf file
TextField.insertInlineTextField();
// Set format
TextField.setFormat("Regular expression");
// Set arbitrary mask
// Set regular expression
TextField.setRegEx("^[0-9]{3}-[0-9]{2}-[0-9]{3}$");
TextField.setFields({
    defaultValue: "123-45-678",
});

FileMenu.downloadAs("pdf");

// Getting verification results
Verification.openFile();
Verification.check(
    "word/document.xml",
    "//w:p[1]/w:sdt[1]/w:sdtContent[1]/w:r[1]/w:t[1]/text()[1]",
    "TextField-default"
);
Verification.check("word/document.xml", "//w:p[2]/w:sdt[1]/w:sdtContent[1]/w:r[1]/w:t[1]/text()[1]", "123");
Verification.check("word/document.xml", "//w:p[3]/w:sdt[1]/w:sdtContent[1]/w:r[1]/w:t[1]/text()[1]", "12345");
Verification.check(
    "word/document.xml",
    "//w:p[4]/w:sdt[1]/w:sdtContent[1]/w:r[1]/w:t[1]/text()[1]",
    "TextFieldDefault"
);
Verification.check("word/document.xml", "//w:p[5]/w:sdt[1]/w:sdtContent[1]/w:r[1]/w:t[1]/text()[1]", "Letters");
Verification.check("word/document.xml", "//w:p[6]/w:sdt[1]/w:sdtContent[1]/w:r[1]/w:t[1]/text()[1]", "1234-5678-9999");
Verification.check("word/document.xml", "//w:p[7]/w:sdt[1]/w:sdtContent[1]/w:r[1]/w:t[1]/text()[1]", "123-45-678");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
