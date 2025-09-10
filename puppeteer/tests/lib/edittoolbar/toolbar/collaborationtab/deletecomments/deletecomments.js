const { DeleteComments } = require("lib");

// Create a new docx file
Tester.createFile("docx");

// Click on default delete comments button
DeleteComments.deleteComments();

// Select "Delete current comments" option from the list
DeleteComments.deleteComments("Delete current comments");

// Select "Delete my comments" option from the list
DeleteComments.deleteComments("Delete my comments");

// Select "Delete all comments" option from the list
DeleteComments.deleteComments("Delete all comments");

// Close the test
Tester.close();
