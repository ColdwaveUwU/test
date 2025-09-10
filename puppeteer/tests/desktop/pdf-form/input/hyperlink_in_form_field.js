//https://bugzilla.onlyoffice.com/show_bug.cgi?id=48392

const { TextField } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert inline TextField into pdf file
TextField.insertInlineTextField();

// // Set default fields settings
TextField.setFields({
    defaultValue: "www.onlyoffice.com",
});

// close test
Tester.close();
