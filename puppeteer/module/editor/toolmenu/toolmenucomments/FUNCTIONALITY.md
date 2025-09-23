# Functionality

Description of the [**ToolMenuComments**](/puppeteer/module/toolmenu/toolmenucomments/README.md) library methods.

### `getComments`

```javascript
/**
 * @typedef {Object} ReplyComment - reply comment
 * @property {string} text
 * @property {number} index
 */
/**
 * @typedef {Object} MainCommentInfo - info about comment
 * @property {string} text
 * @property {number} index
 * @property {ReplyComment} replyComments
 */
/**
 * Gets the created comments from the comments window
 * @returns {Array<MainCommentInfo>}
 */
ToolMenuComments.getComments();
```

Returns all created comments on the page, including their reply comments.

#### Example

```javascript
const comments = ToolMenuComments.getComments();
comments.text; // the text of the main comment
comments.index; // index of the main comment
comments.replyComments.text; // the text of the reply comment
comments.replyComments.index; // index of the reply comment
```

### `getLastComment` and `getFirstComment`

```javascript
/**
 * Get the latest comment
 */
ToolMenuComments.getLastComment();
/**
 * Get the first comment
 */
ToolMenuComments.getFirstComment();
```

It works similarly to [**getComments**](#getcomments), but returns the last or first main comment.

### `checkActiveComments`

```javascript
/**
 * Checks if active comments are present.
 * @returns {Promise<void>}
 */
ToolMenuComments.checkActiveComments();
```

This function checks if the comments tab is active.

### `checkEmptyComments`

```javascript
/**
 * Checks if comments are empty.
 * @returns {Promise<void>}
 */
ToolMenuComments.checkEmptyComments();
```

This function checks if there are any comments available.

### `addReplyComment`

```javascript
/**
 * Adds a reply to a comment.
 * @param {string} text - The text of the reply.
 * @param {number} commentNumber - The comment number (default is 1).
 * @returns {Promise<void>}
 */
ToolMenuComments.addReplyComment(text, (commentNumber = 1));
```

Use this function to add a reply to an existing comment with the specified text.

### `editComment`

```javascript
/**
 * @typedef {Object} UpdatedComment
 * @property {number} number - starts from 1
 * @property {number} [replyNumber] - starts from 1
 * @property {boolean} newText
 * @property {string} text
 */
/**
 * Editing comment
 * @param {UpdatedComment} comment
 */
ToolMenuComments.editComment(comment);
```

This feature allows you to edit comment. The function takes as a parameter an object representing a comment.

-   `comment.number` - represents the number of the main comment on the page.
-   `comment.replyNumber`(optional) - the number of the reply comment.
-   `comment.newText` is a boolean value that determines whether a comment will be overwritten or not.
-   `comment.text` is a string, the text that will be written during editing

#### Example

```javascript
// The reply comment of the first comment will be overwritten
ToolMenuComments.editComment({ number: 1, replyNumber: 1, newText: true, text: "newtext" });
// The main comment will be overwritten
ToolMenuComments.editComment({ number: 1, newText: true, text: "newtext" });
```

### `deleteComments`

```javascript
/**
 * @typedef {Object} DeletedComment
 * @property {number} number - starts from 1
 * @property {number} [replyNumber] - starts from 1
 */
/**
 * Deletes comments.
 * @param {DeletedComment} comments - An array of comment objects.
 * @returns {Promise<void>}
 */
ToolMenuComments.deleteComment(comment);
```

This feature allows you to delete comment.

-   `comment.number` - represents the number of the main comment on the page.
-   `comment.replyNumber`(optional) - the number of the reply comment.

#### Example

```javascript
// Deletes the first reply comment
ToolMenuComments.deleteComment({ number: 1, replyNumber: 1 });
// Deletes the first comment along with its reply comments
ToolMenuComments.deleteComment({ number: 1 });
```

### `setResolve`

```javascript
/**
 * Sets a comment as resolved.
 * @param {number} commentNumber - The comment number (default is 1).
 * @returns {Promise<void>}
 */
ToolMenuComments.setResolve((commentNumber = 1));
```

This function marks a comment as resolved.

### `sortComments`

```javascript
/**
 * Sorts comments by a specified method.
 * @param {string} sortMethod - Sorting method ("newest", "oldest", "az", "za").
 * @returns {Promise<void>}
 */
ToolMenuComments.sortComments(sortMethod);
```

Sort comments based on the specified method, such as "newest," "oldest," "az," or "za."

### `closeComments`

```javascript
/**
 * Closes the comments section.
 * @returns {Promise<void>}
 */
ToolMenuComments.closeComments();
```
