//https://bugzilla.onlyoffice.com/show_bug.cgi?id=51624

const { TextField, Color } = require("lib");

// Open the PDF file for testing
Tester.createFile("pdf");

//Insert fixed TextField into pdf file
TextField.insertFixedTextField();

// Set color & background color
TextField.setColor({
    border: { colorIndex: 16, noBorder: false },
    backgroundColor: { type: Color.Type.Standart, index: 4 },
});

Tester.keyDown("ControlLeft");
Tester.keyPress("C");
Tester.keyUp("ControlLeft");
Tester.keyDown("ControlLeft");
Tester.keyPress("V");
Tester.keyUp("ControlLeft");
// close test
Tester.close();
