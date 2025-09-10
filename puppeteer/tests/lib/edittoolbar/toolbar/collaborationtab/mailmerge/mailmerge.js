const { MailMerge } = require("lib");
Tester.createFile("docx");

// Load data from file
MailMerge.fromFile("documents/xlsx/test-data.xlsx");

// Set checkboxes
MailMerge.setCheckbox("Highlight");
MailMerge.setCheckbox("Preview");
MailMerge.setCheckbox("Current");
MailMerge.setCheckbox("All");
MailMerge.setCheckbox("From");

// Set range of records
MailMerge.setRange(2, 2);

// Navigate to the next record two times
MailMerge.next(2);
// Navigate to the previous record two times
MailMerge.prev(2);
// Navigate to the last record
MailMerge.last();
// Navigate to the first record
MailMerge.first();

// Format
MailMerge.setFormat("Docx");

// Save
MailMerge.save();

// Download
MailMerge.download();

// Close test example
Tester.close();
