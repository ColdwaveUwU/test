# ToolMenuComments

This library implements interaction with the Comments panel functionality.

## Table of Contents

-   [**Types**](#types)
    -   [`SortMethod`](#sortmethod)
    -   [`ShowCommentsOptions`](#showcommentsoptions)
    -   [`DeletedComment`](#deletedcomment)
    -   [`UpdatedComment`](#updatedcomment)
    -   [`ReplyComment`](#replycomment)
    -   [`MainCommentInfo`](#maincommentinfo)
-   [**Methods**](#methods)
    -   [`ToolMenuComments.checkEmptyComments()`](#toolmenucommentscheckemptycomments)
    -   [`ToolMenuComments.addComment(text)`](#toolmenucommentsaddcommenttext)
    -   [`ToolMenuComments.addCommentToDocument(text)`](#toolmenucommentsaddcommenttodocumenttext)
    -   [`ToolMenuComments.getLastComment()`](#toolmenucommentsgetlastcomment)
    -   [`ToolMenuComments.getFirstComment()`](#toolmenucommentsgetfirstcomment)
    -   [`ToolMenuComments.getComments()`](#toolmenucommentsgetcomments)
    -   [`ToolMenuComments.getComment(commentNumber)`](#toolmenucommentsgetcommentcommentnumber)
    -   [`ToolMenuComments.addReplyComment(text, commentNumber)`](#toolmenucommentsaddreplycommenttext-commentnumber)
    -   [`ToolMenuComments.editComment(commentNumber)`](#toolmenucommentseditcommentcommentnumber)
    -   [`ToolMenuComments.deleteComment(commentNumber)`](#toolmenucommentsdeletecommentcommentnumber)
    -   [`ToolMenuComments.setResolve(commentNumber)`](#toolmenucommentssetresolvecommentnumber)
    -   [`ToolMenuComments.sortComments(sortMethod, clickToggle)`](#toolmenucommentssortcommentssortmethod-clicktoggle)
    -   [`ToolMenuComments.showComments(showComments)`](#toolmenucommentsshowcommentsshowcomments)
    -   [`ToolMenuComments.closeComments()`](#toolmenucommentsclosecomments)
-   [**Example**](#example)

## Types

### SortMethod

```javascript
/**
 * @typedef {Object} SortMethod
 * @property {
 * "Newest"
 * | "Oldest"
 * | "Author A to Z"
 * | "Author Z to A"
 * | "From top"
 * | "From bottom"
 * | "Show comments"
 * | "Add comment to document"
 * } [sortMethod]
 */
```

### ShowCommentsOptions

```javascript
/**
 * @typedef {Object} ShowCommentsOptions
 * @property {
 * | "Open"
 * | "Resolved"
 * | "All"
 * } [showComments]
 */
```

### DeletedComment

```javascript
/**
 * @typedef {Object} DeletedComment
 * @property {number} number - starts from 1
 * @property {number} [replyNumber] - starts from 1
 */
```

### UpdatedComment

```javascript
/**
 * @typedef {Object} UpdatedComment
 * @property {number} number - starts from 1
 * @property {number} [replyNumber] - starts from 1
 * @property {string} text - comment text
 */
```

### ReplyComment

Object representing a reply comment.

```javascript
/**
 * @typedef {Object} ReplyComment - reply comment
 * @property {string} text - reply text
 * @property {string} userName - reply user name
 * @property {string} date - reply date
 * @property {number} index - reply index
 */

```

### MainCommentInfo

Object representing a main comment with its replies.

```javascript
/**
 * @typedef {Object} MainCommentInfo - info about comment
 * @property {string} text - comment text
 * @property {number} index - comment index
 * @property {string} userName - comment user name
 * @property {string} date - comment date
 * @property {ReplyComment} replyComments - reply comments
 */
```

## Methods

### ToolMenuComments.checkEmptyComments()

```javascript
/**
 * Checking empty comments
 * @returns {Promise<boolean>}
 */
ToolMenuComments.checkEmptyComments();
```

### ToolMenuComments.addComment(text)

```javascript
/**
 * Adding a comment
 * @param {string} text - The comment text to add.
 */
ToolMenuComments.addComment(text);
```

### ToolMenuComments.addCommentToDocument(text)

```javascript
/**
 * Adding a comment to the document
 * @param {string} text - The comment text to add to the document.
 */
ToolMenuComments.addCommentToDocument(text);
```

### ToolMenuComments.getLastComment()

```javascript
/**
 * Get the latest comment
 * @returns {Promise<MainCommentInfo>}
 */
ToolMenuComments.getLastComment();
```

### ToolMenuComments.getFirstComment()

```javascript
/**
 * Get the first comment
 * @returns {Promise<MainCommentInfo>}
 */
ToolMenuComments.getFirstComment();
```

### ToolMenuComments.getComments()

```javascript
/**
 * Get all comments
 * @returns {Promise<Array<MainCommentInfo>>}
 */
ToolMenuComments.getComments();
```

### ToolMenuComments.getComment(commentNumber)

```javascript
/**
 * Get specific comment by number
 * @param {number} commentNumber - The comment number (starts from 1).
 * @returns {Promise<MainCommentInfo>}
 */
ToolMenuComments.getComment(commentNumber);
```

### ToolMenuComments.addReplyComment(text, commentNumber)

```javascript
/**
 * Add reply to comment
 * @param {string} text - The reply text.
 * @param {number} [commentNumber] - The comment number to reply to (default is 1).
 */
ToolMenuComments.addReplyComment(text, commentNumber);
```

### ToolMenuComments.editComment(commentNumber)

```javascript
/**
 * Editing comment
 * @param {UpdatedComment} commentNumber - The comment data to edit.
 */
ToolMenuComments.editComment(commentNumber);
```

### ToolMenuComments.deleteComment(commentNumber)

```javascript
/**
 * Delete comment
 * @param {DeletedComment} commentNumber - The comment data to delete.
 */
ToolMenuComments.deleteComment(commentNumber);
```

### ToolMenuComments.setResolve(commentNumber)

```javascript
/**
 * Set Resolve Comment
 * @param {number} [commentNumber] - The comment number to resolve (default is 1).
 */
ToolMenuComments.setResolve(commentNumber);
```

### ToolMenuComments.sortComments(sortMethod, clickToggle)

```javascript
/**
 * Sort comments
 * @param {SortMethod} [sortMethod] - The sorting method.
 * @param {boolean} [clickToggle] - Whether to click the toggle button (default is false).
 */
ToolMenuComments.sortComments(sortMethod, clickToggle);
```

### ToolMenuComments.showComments(showComments)

```javascript
/**
 * Show comments with filter
 * @param {ShowCommentsOptions} [showComments] - The show comments filter option.
 */
ToolMenuComments.showComments(showComments);
```

### ToolMenuComments.closeComments()

```javascript
/**
 * Close comments panel
 * @returns {Promise<void>}
 */
ToolMenuComments.closeComments();
```

## Example

```javascript
// Include the ToolMenuComments library
const { ToolMenuComments } = require("lib");

// Create a new document
Tester.createFile("docx");

// Add some content to the document
// ... (code to add content)

// Check if there are no comments
const isEmpty = ToolMenuComments.checkEmptyComments();
console.log(`Comments empty: ${isEmpty}`);

// Add a comment
ToolMenuComments.addComment("This is my first comment");

// Add a comment to the document
ToolMenuComments.addCommentToDocument("Another comment");

// Get all comments
const allComments = ToolMenuComments.getComments();
console.log(`Total comments: ${allComments.length}`);

// Get first comment
const firstComment = ToolMenuComments.getFirstComment();
console.log(`First comment text: ${firstComment.text}`);

// Get last comment
const lastComment = ToolMenuComments.getLastComment();
console.log(`Last comment by: ${lastComment.userName}`);

// Get specific comment
const comment = ToolMenuComments.getComment(1);
console.log(`Comment #1: ${comment.text}`);

// Add reply to comment
ToolMenuComments.addReplyComment("This is a reply", 1);

// Edit comment
ToolMenuComments.editComment({
    number: 1,
    text: "Updated comment text",
});

// Edit reply comment
ToolMenuComments.editComment({
    number: 1,
    replyNumber: 1,
    text: "Updated reply text",
});

// Sort comments by newest
ToolMenuComments.sortComments("Newest");

// Sort comments by author
ToolMenuComments.sortComments("Author A to Z");

// Show only open comments
ToolMenuComments.showComments("Open");

// Show resolved comments
ToolMenuComments.showComments("Resolved");

// Resolve a comment
ToolMenuComments.setResolve(1);

// Delete reply comment
ToolMenuComments.deleteComment({ number: 1, replyNumber: 1 });

// Delete main comment
ToolMenuComments.deleteComment({ number: 2 });

// Close comments panel
ToolMenuComments.closeComments();

// Close the test example
Tester.close();
```
