// set AllowedSymbols value for TextField in PDF-form
const { TextField, FileMenu, Verification } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

// Inserts inline text field in pdf-editor
TextField.insertInlineTextField();

TextField.setFields({
    defaultValue: "qwerty123456",
});
// set allowed symbols
TextField.setAllowedSymbols("1234567890qwertyuiop[]asdfghjkl;'zxcvbnm");
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");
// Inserts fixed text field in pdf-editor
TextField.insertFixedTextField();

TextField.setFields({
    defaultValue: "qwerty-123456",
});
// set allowed symbols
TextField.setAllowedSymbols("1234567890qwertyuiop[]asdfghjkl;'zxcvbnm");
FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
Verification.check(
    "word/document.xml",
    "//w:p[2]/w:sdt[1]/w:sdtPr[1]/w:textFormPr[1]/w:format[1]/@w:symbols",
    "1234567890qwertyuiop[]asdfghjkl;'zxcvbnm"
);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();
