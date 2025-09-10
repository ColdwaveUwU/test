// Include the CompareChanges library
const { CompareChanges } = require("lib");

// Create new file
Tester.createFile("docx");

// Set settings
CompareChanges.setSettings("Word level");

// Set settings
CompareChanges.setSettings("Character level");

// Load file
CompareChanges.fromFile("documents/docx/change-test.docx");

// Load url
CompareChanges.fromUrl("https://file-examples.com/wp-content/storage/2017/02/file-sample_100kB.docx");

// Load storage
CompareChanges.fromStorage();

// Close text example
Tester.close();
