const { ToolMenuComments } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");

// Input sample text into the document
Tester.input("Lorem Ipsum is simply dummy text of the printing and typesetting industry.");

// Add first comment
ToolMenuComments.addComment("First test comment");

// Add comment to document
ToolMenuComments.addCommentToDocument("Comment added to document");

// Sort comments by oldest
ToolMenuComments.sortComments("Oldest");

// Get the last comment and verify it exists
const lastComment = ToolMenuComments.getLastComment();
console.log(`Last comment text: ${lastComment.text}`);
if (!lastComment.text.includes("Comment added to document")) {
    throw new Error("Last comment text is incorrect");
}

// Get the first comment
const firstComment = ToolMenuComments.getFirstComment();
console.log(`First comment text: ${firstComment.text}`);

// Get all comments
const allComments = ToolMenuComments.getComments();
console.log(`Total comments count: ${allComments.length}`);
if (allComments.length !== 2) {
    throw new Error("Incorrect number of comments");
}

// Get specific comment by number
const specificComment = ToolMenuComments.getComment(1);
console.log(`Comment #1 text: ${specificComment.text}`);

// Add reply comment to the first comment
ToolMenuComments.addReplyComment("First reply comment", 1);
ToolMenuComments.addReplyComment("Second reply comment", 1);

// Add reply comment to the second comment
ToolMenuComments.addReplyComment("First reply second comment", 2);
ToolMenuComments.addReplyComment("Second reply second comment", 2);

// Edit the main comment
ToolMenuComments.editComment({ number: 1, text: "Edited first comment" });

// Edit reply comment
ToolMenuComments.editComment({ number: 1, replyNumber: 1, text: "Edited first reply" });

// Edit the second reply comment
ToolMenuComments.editComment({ number: 1, replyNumber: 2, text: "Edited second reply" });

// Edit the second reply comment
ToolMenuComments.editComment({ number: 2, replyNumber: 1, text: "Edited first reply" });
ToolMenuComments.editComment({ number: 2, replyNumber: 2, text: "Edited second reply" });

// Sort comments by newest
ToolMenuComments.sortComments("Newest");

// Sort comments by oldest
ToolMenuComments.sortComments("Oldest");

// Sort comments by author A to Z
ToolMenuComments.sortComments("Author A to Z");

// Show only open comments
ToolMenuComments.showComments("Open");

// Show all comments
ToolMenuComments.showComments("All");

// Resolve the first comment
ToolMenuComments.setResolve(1);

// Resolve the first comment
ToolMenuComments.setResolve(2);

// Show only resolved comments
ToolMenuComments.showComments("Resolved");

// Show all comments again
ToolMenuComments.showComments("All");

// Delete reply comment
ToolMenuComments.deleteComment({ number: 1, replyNumber: 2 });

// Delete main comment
ToolMenuComments.deleteComment({ number: 2 });

// // Verify the remaining comment count
const remainingComments = ToolMenuComments.getComments();
console.log(`Remaining comments count: ${remainingComments.length}`);
if (remainingComments.length !== 1) {
    throw new Error("Incorrect remaining comments count");
}

// Close comments menu
ToolMenuComments.closeComments();

// Close the test
Tester.close();
