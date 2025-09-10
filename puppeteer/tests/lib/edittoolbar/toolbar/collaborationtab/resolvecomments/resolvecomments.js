const { ResolveComments } = require("lib");

// Create a new docx file
Tester.createFile("docx");

// Click on default resolve comments button
ResolveComments.resolveComments();

// Click on resolve current comments button
ResolveComments.resolveComments("Resolve current comments");

// Click on resolve my comments button
ResolveComments.resolveComments("Resolve my comments");

// Click on resolve all comments button
ResolveComments.resolveComments("Resolve all comments");

// Close the file
Tester.close();
