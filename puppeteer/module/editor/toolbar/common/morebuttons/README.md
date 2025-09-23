# MoreButtons

Class for opening or closing the button "More" UI dropdown.

## Table of Contents

* [**Methods**](#methods)

  * [`MoreButtons.open()`](#open)
  * [`MoreButtons.close()`](#close)
* [**Example**](#example)

## Methods

### MoreButtons.open()

```javascript
/**
 * Opens the "More buttons" panel if it is currently closed.
 */
await MoreButtons.open();
```

### MoreButtons.close()

```javascript
/**
 * Closes the "More buttons" panel if it is currently open.
 */
await MoreButtons.close();
```

## Example

```javascript
const { MoreButtons } = require("lib");

const moreButtons = new MoreButtons(tester);

// open the "More buttons" panel
await moreButtons.open();

// perform other actions...

// close the panel
await moreButtons.close();
```
