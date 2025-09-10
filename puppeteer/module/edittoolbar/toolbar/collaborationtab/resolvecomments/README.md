# ResolveComments

Library for interacting with comment resolution.

## Table of Contents

-   [**Methods**](#methods)
    -   [`ResolveComments.resolveComments(optionValue)`](#resolvecommentsresolvecommentsoptionvalue)
-   [**Example**](#example)

## Methods

### ResolveComments.resolveComments(optionValue)

```javascript
/**
 * Click the default resolve comments button or click the resolve comments button with options.
 * @param {"Resolve current comment" | "Resolve my comments" | "Resolve all comments"} [optionValue]
 */
ResolveComments.resolveComments(optionValue);
```

## Example

```javascript
// Include the ResolveComments library
const { ResolveComments } = require("lib");

// Create a new docx file
Tester.createFile("docx");

// Click on default resolve comments button
ResolveComments.resolveComments();

// Select "Resolve current comment" option from the list
ResolveComments.resolveComments("Resolve current comment");

// Select "Resolve my comments" option from the list
ResolveComments.resolveComments("Resolve my comments");

// Select "Resolve all comments" option from the list
ResolveComments.resolveComments("Resolve all comments");

// Close the test
Tester.close();
```
