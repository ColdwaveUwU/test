//https://bugzilla.onlyoffice.com/show_bug.cgi?id=51319
//https://bugzilla.onlyoffice.com/show_bug.cgi?id=55502

const { Checkbox, TestData } = require("lib");
Tester.createFile("pdf");
Tester.input(TestData.LOREM_IPSUM());
Tester.keyPress("Enter");
Tester.input("Hello");
Tester.keyDown("ControlLeft");
Tester.keyPress("A");
Tester.keyUp("ControlLeft");
// insert inline checkbox
Checkbox.insertCheckbox();
// close test
Tester.close();
