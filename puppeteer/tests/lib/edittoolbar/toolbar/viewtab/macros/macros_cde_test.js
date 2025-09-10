// Include the Macros library
const { Macros } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Open the Macros dialog
Macros.openMacros();

// Create a new macro
Macros.addMacros();

// Copy the macro
Macros.copyMacros("Macro 2");

// Rename the macro
Macros.renameMacros("Macro 1", "My macro");

// Select the macro
Macros.selectMacrosByName("My macro");

// Input a script into the Macros dialog
const macrosScript = `
let doc = Api.GetDocument();
let paragraph = Api.CreateParagraph();
paragraph.AddText("Hello world!");
doc.InsertContent([paragraph]);
`;

// Input a script into the Macros dialog
Macros.inputScript(macrosScript);

// Undo the macro
Macros.undo();

// Redo the macro
Macros.redo();

// Set the macro to start automatically
Macros.setMacrosAutostart(true);

// Click the save button
Macros.saveMacros();

// Open the Macros dialog
Macros.openMacros();

// Run the macro
Macros.runMacros("My macro");

// Delete the macro
Macros.deleteMacros("My macro");

// Cancel the macros dialog
Macros.cancelMacros();

// Close the test example
Tester.close();
