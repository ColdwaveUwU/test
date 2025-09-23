# Bookmark

This library implements interaction with the Bookmark settings window.

## Table of Contents

-   [**Methods**](#methods)
    -   [`Bookmark.addBookmark(name)`](#bookmarkaddbookmarkname)
    -   [`Bookmark.deleteBookmark(name)`](#bookmarkdeletebookmarkname)
    -   [`Bookmark.goToBookmark(name)`](#bookmarkgotobookmarkname)
    -   [`Bookmark.selectBookmarkByName(name)`](#bookmarkselectbookmarkbynamename)
    -   [`Bookmark.getBookmarkLink(name)`](#bookmarkgetbookmarklinkname)
-   [**Examples**](#examples)

## Methods

### Bookmark.addBookmark(name)

```javascript
/**
 * Adds a bookmark with the given name
 * @param name Bookmark name
 */
Bookmark.addBookmark(name);
```

### Bookmark.deleteBookmark(name)

```javascript
/**
 * Deletes a bookmark with the given name
 * @param name Bookmark name
 */
Bookmark.deleteBookmark(name);
```

### Bookmark.goToBookmark(name)

```javascript
/**
 * Clicks the Go to button
 * @param name Bookmark name
 */
Bookmark.goToBookmark(name);
```

### Bookmark.selectBookmarkByName(name)

```javascript
/**
 * Finds a bookmark item by name and clicks on it
 * @param name Bookmark name
 */
Bookmark.selectBookmarkByName(name);
```

### Bookmark.getBookmarkLink(name)

```javascript
/**
 * Gets the link for the bookmark
 * @param name Bookmark name
 * @returns {Promise<string>} Link value
 */
Bookmark.getBookmarkLink(name);
```

## Examples

```javascript
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
```
