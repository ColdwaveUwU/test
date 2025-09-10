//https://bugzilla.onlyoffice.com/show_bug.cgi?id=51226

const { TextField } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert fixed TextField into pdf file
TextField.insertFixedTextField();

// delete textfield
TextField.delete();
//Insert fixed TextField into pdf file
TextField.insertFixedTextField();

// close test
Tester.close();
