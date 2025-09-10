// Create a new docx file for testing
const { InterfaceTheme } = require("lib");
Tester.createFile("docx");
// Set interface theme to Light
InterfaceTheme.setInterfaceTheme("Light");
// Set interface theme to Dark
InterfaceTheme.setInterfaceTheme("Dark");
// Click dark document (CDE only)
InterfaceTheme.clickDarkDocument();
Tester.close();
