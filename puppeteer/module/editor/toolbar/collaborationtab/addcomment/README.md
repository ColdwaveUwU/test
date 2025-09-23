# AddComment

Library for interacting with collaboration tab comments.

## Table of Contents

-   [**Methods**](#methods)
    -   [`AddComment.insertComment()`](#addcommentinsertcomment)
    -   [`AddComment.setComment(text)`](#addcommentsetcommenttext)
    -   [`AddComment.addComment()`](#addcommentaddcomment)
    -   [`AddComment.cancelComment()`](#addcommentcancelcomment)
    -   [`AddComment.deleteComment()`](#addcommentdeletecomment)
    -   [`AddComment.editComment(text)`](#addcommenteditcommenttext)
    -   [`AddComment.resolveComment()`](#addcommentresolvecomment)
    -   [`AddComment.addReplyComment(text)`](#addcommentaddreplycommenttext)
    -   [`AddComment.editReplyComment(text, replyIndex)`](#addcommenteditreplycommenttext-replyindex)
    -   [`AddComment.deleteReplyComment(replyIndex)`](#addcommentdeletereplycommentreplyindex)
-   [**Example**](#example)

## Methods

### AddComment.insertComment()

```javascript
/**
 * Initializes the comment.
 * Text must be entered before calling this method.
 */
AddComment.insertComment();
```

### AddComment.setComment(text)

```javascript
/**
 * Sets the comment text.
 * @param {string} [text] - The text to be added as a comment
 */
AddComment.setComment(text);
```

### AddComment.addComment()

```javascript
/**
 * Adds the comment to the document.
 */
AddComment.addComment();
```

### AddComment.cancelComment()

```javascript
/**
 * Cancels the comment addition.
 */
AddComment.cancelComment();
```

### AddComment.deleteComment()

```javascript
/**
 * Deletes the comment.
 */
AddComment.deleteComment();
```

### AddComment.editComment(text)

```javascript
/**
 * Edits an existing comment.
 * @param {string} [text] - New comment text
 */
AddComment.editComment(text);
```

### AddComment.resolveComment()

```javascript
/**
 * Resolves (closes) the comment.
 */
AddComment.resolveComment();
```

### AddComment.addReplyComment(text)

```javascript
/**
 * Adds a reply to the comment.
 * @param {string} [text] - Reply text
 */
AddComment.addReplyComment(text);
```

### AddComment.editReplyComment(text, replyIndex)

```javascript
/**
 * Edits a reply to the comment.
 * @param {string} [text] - New reply text
 * @param {number} [replyIndex] - Index of the reply to edit (optional, defaults to last reply)
 */
AddComment.editReplyComment(text, replyIndex);
```

### AddComment.deleteReplyComment(replyIndex)

```javascript
/**
 * Deletes a reply to the comment.
 * @param {number} [replyIndex] - Index of the reply to delete (optional, defaults to last reply)
 */
AddComment.deleteReplyComment(replyIndex);
```

## Example

```javascript
// Include the AddComment library
const { AddComment } = require("lib");

// Create a new DOCX file
Tester.createFile("docx");

// Input text into the document
Tester.input("Lorem Ipsum is simply dummy text of the printing and typesetting industry.");

// Add a comment
AddComment.insertComment();
AddComment.setComment("Test comment");
AddComment.addComment();

// Add replies to the comment
AddComment.addReplyComment("Test reply 1");
AddComment.addReplyComment("Test reply 2");
AddComment.addReplyComment("Test reply 3");

// Edit the second reply
AddComment.editReplyComment("Edited reply", 1);

// Delete the last reply
AddComment.deleteReplyComment();

// Resolve the comment
AddComment.resolveComment();

// Close the test
Tester.close();
```
