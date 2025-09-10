// Import libraries
const { CompareChanges, VersionHistory } = require("lib");

// Create a new file
Tester.createFile("docx");

// Load file from storage
CompareChanges.fromStorage();

// Input text
Tester.keyPress("Enter");
Tester.waitAutosave();
Tester.input("Test paragraph.");
Tester.waitAutosave();
// See history
VersionHistory.openHistory();

// Go to next record
VersionHistory.reviewRecord();

// Restore version (select and restore second record)
VersionHistory.reviewRecord(1, true);

// Set options
VersionHistory.setOptions("Highlight");

// Close History
VersionHistory.close();

// Test example
Tester.close();
