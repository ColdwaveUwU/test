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
 * Opens the "More buttons" panel if it is currently closed.
 */
MoreButton.open();
```

### MoreButton.close()

```javascript
/**
 * Closes the "More buttons" panel if it is currently open.
 */
MoreButton.close();
```

## Example

```javascript
const { MoreButton } = require("lib");

const moreButton = new MoreButton(tester);

// open the "More buttons" panel
moreButton.open();

// perform other actions...

// close the panel
moreButton.close();
```
