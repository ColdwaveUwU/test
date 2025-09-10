# ReviewChanges

Library for interacting with Review Changes.

## Table of Contents

-   [**Methods**](#methods)
    -   [`ReviewChanges.trackChanges(optionValue)`](#reviewchangestrackchangesoptionvalue)
    -   [`ReviewChanges.enableTrackChangesForEveryone(isEnable)`](#reviewchangesenabletrackchangesforeveryoneisenable)
    -   [`ReviewChanges.previous()`](#reviewchangesprevious)
    -   [`ReviewChanges.next()`](#reviewchangesnext)
    -   [`ReviewChanges.accept(optionValue)`](#reviewchangesacceptoptionvalue)
    -   [`ReviewChanges.reject(optionValue)`](#reviewchangesrejectoptionvalue)
-   [**Example**](#example)

## Methods

### ReviewChanges.trackChanges(optionValue)

```javascript
/**
 * Click the default track changes button or click the track changes button with options.
 * @param {"ON for me" | "OFF for me" | "ON for me and everyone" | "OFF for me and everyone"} [optionValue]
 */
ReviewChanges.trackChanges(optionValue);
```

### ReviewChanges.enableTrackChangesForEveryone(isEnable)

```javascript
/**
 * Click Enable or Cancel button in "Enable track changes" message
 * @param {Boolean} isEnable
 */
ReviewChanges.enableTrackChangesForEveryone(isEnable);
```

### ReviewChanges.previous()

```javascript
/**
 * Click to previous change
 */
ReviewChanges.previous();
```

### ReviewChanges.next()

```javascript
/**
 * Click to next change
 */
ReviewChanges.next();
```

### ReviewChanges.accept(optionValue)

```javascript
/**
 * Click the accept button or click the accept button with options.
 * @param {"Accept current change" | "Accept all changes"} [optionValue]
 */
ReviewChanges.accept(optionValue);
```

### ReviewChanges.reject(optionValue)

```javascript
/**
 * Click the reject button or click the reject button with options.
 * @param {"Reject current change" | "Reject All Changes"} [optionValue]
 */
ReviewChanges.reject(optionValue);
```

## Example

```javascript
// Include the ReviewChanges library
const { ReviewChanges } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Click on default Track Changes button
ReviewChanges.trackChanges();

// Select "ON for me and everyone" option from the list
ReviewChanges.trackChanges("ON for me and everyone");

// Enable track changes for everyone (in modal window)
// if true - click enable else click cancel
ReviewChanges.enableTrackChangesForEveryone(true);

// Navigate through changes
ReviewChanges.previous();
ReviewChanges.next();

// Accept current change
ReviewChanges.accept("Accept current change");

// Reject all changes
ReviewChanges.reject("Reject All Changes");

// Close the test example
Tester.close();
```
