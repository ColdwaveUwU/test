const { Bookmark } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");

// Add a bookmark
Bookmark.addBookmark("TestBookmark");

// Add a bookmark 2
Bookmark.addBookmark("TestBookmark2");

// Add a bookmark 3
Bookmark.addBookmark("TestBookmark3");

// Go to the bookmark
Bookmark.goToBookmark("TestBookmark3");

// Get the link for the bookmark
const link = Bookmark.getBookmarkLink("TestBookmark");
console.log(`Bookmark link: ${link}`);

// Delete the bookmark
Bookmark.deleteBookmark("TestBookmark");

// Close the test
Tester.close();
