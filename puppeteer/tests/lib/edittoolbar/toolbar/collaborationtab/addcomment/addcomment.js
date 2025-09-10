const { AddComment } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");

// Input sample text into the document
Tester.input("Lorem Ipsum is simply dummy text of the printing and typesetting industry.");

// Initialize the comment
AddComment.insertComment();

// Set the initial comment text
AddComment.setComment("Test Comment");

// Add the comment to the document
AddComment.addComment();

// Edit the existing comment with new text
AddComment.editComment("Edited Comment");

// Add three reply comments in sequence
AddComment.addReplyComment("Test Reply 1");
AddComment.addReplyComment("Test Reply 2");
AddComment.addReplyComment("Test Reply 3");

// Edit the second reply comment (index 1)
AddComment.editReplyComment("Edited Reply", 1);

// Delete the last reply comment
AddComment.deleteReplyComment();

// Resolve the comment
AddComment.resolveComment();

//Add new comment
AddComment.insertComment();
AddComment.setComment("Test Comment");
AddComment.addComment();

// Delete the comment
AddComment.deleteComment();

// Close the test
Tester.close();
