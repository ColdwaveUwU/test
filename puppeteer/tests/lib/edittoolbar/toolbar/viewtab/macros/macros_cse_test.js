// Include the Macros library
const { Macros } = require("lib");

// Open the file new.xlsx
Tester.createFile("xlsx");

// Open the Macros dialog
Macros.openMacros();

// Add a custom function
Macros.addCustomFunction();

// Add a custom function
Macros.addCustomFunction();

// Rename a custom function
Macros.renameCustomFunction("Custom function 1", "My custom function");

// Select a custom function
Macros.selectCustomFunction("My custom function");

// Input a script into the Macros dialog
Macros.inputScript("CustomFunction1()", false);

// Delete a custom function
Macros.deleteCustomFunction("My custom function");

// Close the Macros dialog
Macros.cancelMacros();

// Close the test example
Tester.close();
