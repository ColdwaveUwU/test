const { CombineChanges } = require("lib");

// Create a new file
Tester.createFile("docx");

// Combine changes from a file
CombineChanges.fromFile("documents/docx/Formulas.docx");

// Combine changes from a URL
CombineChanges.fromUrl("https://file-examples.com/wp-content/storage/2017/02/file-sample_100kB.docx");

// Combine changes from a storage
CombineChanges.fromStorage();

// Set comparison settings to character level
CombineChanges.setSettings("Character level");

// Close the test example
Tester.close();
