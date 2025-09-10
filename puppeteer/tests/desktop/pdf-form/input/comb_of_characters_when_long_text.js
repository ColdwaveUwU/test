//https://bugzilla.onlyoffice.com/show_bug.cgi?id=57391

const { TextField, FileMenu } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert inline TextField into pdf file
TextField.insertInlineTextField();
Tester.keyPress("ArrowRight");
Tester.keyPress("Enter");
//Insert fixed TextField into pdf file
TextField.insertFixedTextField();
// Set default fields settings
TextField.setFields({
    key: "Text1",
    defaultValue: "Dhek45 754n 98569",
});
// Set fixed size
TextField.setFixedSize(true);
// Set char limit
TextField.setCharLimit(true);
// Set combo chars
TextField.setComboChars(true);
FileMenu.downloadAs("pdf");
// close test
Tester.close();
