# MoreButton

Class for opening or closing the button "More" UI dropdown.

## Table of Contents

-   [**Methods**](#methods)

    -   [`MoreButton.open()`](#morebuttonopen)
    -   [`MoreButton.close()`](#morebuttonclose)

-   [**Example**](#example)

## Methods

### MoreButton.open()

```javascript
/**
 * Opens the "More button" panel if it is currently closed.
 */
await MoreButton.open();
```

### MoreButton.close()

```javascript
/**
 * Closes the "More button" panel if it is currently open.
 */
await MoreButton.close();
```

## Example

```javascript
const { MoreButton } = require("lib");

const moreButton = new MoreButton(tester);

// open the "More buttons" panel
await moreButton.open();

// perform other actions...

// close the panel
await moreButton.close();
```
