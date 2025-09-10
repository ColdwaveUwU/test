# DeleteComments

Library for interacting with comment deletion.

## Table of Contents

-   [**Methods**](#methods)
    -   [`DeleteComments.deleteComments(optionValue)`](#deletecommentsdeletecommentsoptionvalue)
-   [**Example**](#example)

## Methods

### DeleteComments.deleteComments(optionValue)

```javascript
/**
 * Click the default delete comments button or click the delete comments button with options.
 * @param {"Delete current comments" | "Delete my comments" | "Delete all comments"} [optionValue]
 */
DeleteComments.deleteComments(optionValue);
```

## Example

```javascript
// Include the DeleteComments library
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
```
